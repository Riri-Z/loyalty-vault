import { useContext, useEffect, useMemo, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Pressable,
	FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import { ViewContainer } from "@/components/ui/ViewContainer";
import { useCameraPermissions } from "expo-camera";
import { RenderCamera } from "@/components/shared/RenderCamera";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { CardContext } from "@/providers/CardContext";
import Toast from "react-native-toast-message";
import { BottomSheetContext } from "@/providers/BottomSheetContext";
import { usePostHog } from "posthog-react-native";
import {
	frenchStores,
	generateCardNumber,
	getStoreById,
	searchStores,
} from "@/services/storesDatabase";
import { StoreLogo } from "@/components/shared/StoreLogo";

type ModalParams = {
	nameCard: string;
	fileCard: string;
	idCard: string;
	storeIdCard: string;
	cardNumberCard: string;
};

type ActionItem = {
	label: string;
	callback: () => void;
};

export default function AddCardScreen(): JSX.Element {
	const { updateCard, addCard } = useContext(CardContext);
	const { handleUpdateActions, isVisible, actions, handleCloseBottomSheet } = useContext(BottomSheetContext);
	const { textColor, bgColor, danger, cardColor, secondaryColor } = useColor();
	const posthog = usePostHog();

	const [name, setName] = useState("");
	const [file, setFile] = useState("");
	const [activeCamera, setActiveCamera] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();
	const [canSave, setCanSave] = useState(false);
	const [storeQuery, setStoreQuery] = useState("");
	const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
	const [showStoreList, setShowStoreList] = useState(false);
	const [cardNumber, setCardNumber] = useState("");

	const { nameCard, fileCard, idCard, storeIdCard, cardNumberCard } =
		useLocalSearchParams() as ModalParams;
	const { t, i18n } = useTranslation();

	const selectedStore = selectedStoreId ? getStoreById(selectedStoreId) : null;

	const filteredStores = useMemo(() => {
		if (!storeQuery.trim()) return frenchStores.slice(0, 20);
		return searchStores(storeQuery).slice(0, 20);
	}, [storeQuery]);

	useEffect(() => {
		setCanSave(name !== "" && file !== "");
	}, [name, file]);

	useEffect(() => {
		if (nameCard) setName(nameCard);
		if (fileCard) setFile(fileCard);
		if (storeIdCard) setSelectedStoreId(Number(storeIdCard));
		if (cardNumberCard) setCardNumber(cardNumberCard);
	}, [nameCard, fileCard, storeIdCard, cardNumberCard]);

	const pickFile = async (): Promise<void> => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			setFile(result.assets[0].uri);
		} else if (!file) {
			Toast.show({ type: "error", text1: t("cards.alert.cancelCamera") });
		}
		handleCloseBottomSheet();
	};

	const handleTakePhoto = (uri: string): void => {
		setFile(uri);
		handleCloseBottomSheet();
	};

	const handleSaveNewCard = async (): Promise<void> => {
		try {
			if (name.length <= 0 && !file) {
				return Toast.show({ type: "error", text1: t("cards.alert.NameAndFileMissing") });
			}
			if (name.length <= 0) {
				return Toast.show({ type: "error", text1: t("cards.alert.missingName") });
			}
			if (!file) {
				return Toast.show({ type: "error", text1: t("cards.alert.missingFile") });
			}

			const finalCardNumber = cardNumber.trim() || generateCardNumber();

			if (idCard) {
				const res = await updateCard({
					id: +idCard,
					name,
					fileUri: file,
					storeId: selectedStoreId,
					cardNumber: finalCardNumber,
				});
				if (res.success) {
					Toast.show({ type: "success", text1: t("cards.addCardAlert.success") });
					posthog.capture("success updating new card");
				} else {
					Toast.show({ type: "error", text1: t("cards.addCardAlert.failed") });
					posthog.capture("Failed updating new card");
				}
			} else {
				const res = await addCard({
					name,
					fileUri: file,
					storeId: selectedStoreId,
					cardNumber: finalCardNumber,
				});
				if (res.success) {
					Toast.show({ type: "success", text1: t("cards.addCardAlert.success") });
					posthog.capture("success adding new card");
				} else {
					Toast.show({ type: "error", text1: t("cards.addCardAlert.failed") });
					posthog.capture("Failed adding new card");
				}
			}
			router.push("/(tabs)");
		} catch (error) {
			console.error(error);
			Toast.show({ type: "error", text1: t("cards.alert.errorCamera") });
		}
	};

	const handleDeleteFile = (): void => {
		setFile("");
	};

	const handleOpenCamera = async (): Promise<void> => {
		if (!permission?.granted) {
			const permissionResult = await requestPermission();
			if (permissionResult.granted) {
				setActiveCamera(true);
			} else {
				Toast.show({ type: "error", text1: t("cards.alert.needCamera") });
				setActiveCamera(false);
			}
		} else {
			setActiveCamera(true);
		}
	};

	const handleOptionFile = (): void => {
		handleUpdateActions(getBottomSheetOptions().actionsItems);
	};

	const getBottomSheetOptions = (): { actionsItems: ActionItem[]; handleClose: () => void } => ({
		actionsItems: [
			{ label: i18n.t("cards.cta.openCamera"), callback: handleOpenCamera },
			{ label: i18n.t("cards.cta.selectFile"), callback: pickFile },
		],
		handleClose: handleCloseBottomSheet,
	});

	return (
		<>
			{activeCamera ? (
				<RenderCamera updateUri={handleTakePhoto} closeCamera={() => setActiveCamera(false)} />
			) : (
				<View style={[styles.container, { backgroundColor: bgColor }]}>
					<ViewContainer>
						<View style={styles.header}>
							<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
								<Ionicons name="arrow-back" size={24} color={textColor} />
							</TouchableOpacity>
							<Text style={[styles.title, { color: textColor }]}>
								{fileCard ? t("cards.editCard") : t("cards.addCard")}
							</Text>
						</View>

						<Text style={[styles.label, { color: textColor }]}>{t("cards.cardName")}</Text>
						<View style={styles.inputContainer}>
							<Ionicons name="card-outline" size={20} color="#777" style={styles.icon} />
							<TextInput
								style={[styles.input, { color: textColor }]}
								placeholder={t("cards.placeHolderName")}
								placeholderTextColor={textColor}
								value={name}
								onChangeText={setName}
								onFocus={handleCloseBottomSheet}
							/>
						</View>

						<Text style={[styles.label, { color: textColor }]}>{t("cards.storeLabel")}</Text>
						{selectedStore ? (
							<View style={[styles.storeSelected, { borderColor: textColor + "30" }]}>
								<StoreLogo storeId={selectedStoreId} size={36} />
								<Text style={[styles.storeSelectedText, { color: textColor }]}>
									{selectedStore.name}
								</Text>
								<Pressable
									onPress={() => {
										setSelectedStoreId(null);
										setStoreQuery("");
									}}>
									<Entypo name="circle-with-cross" size={20} color={danger} />
								</Pressable>
							</View>
						) : (
							<View style={styles.storeSearchContainer}>
								<View style={styles.inputContainer}>
									<MaterialIcons name="search" size={20} color="#777" style={styles.icon} />
									<TextInput
										style={[styles.input, { color: textColor }]}
										placeholder={t("cards.storeSearchPlaceholder")}
										placeholderTextColor={textColor}
										value={storeQuery}
										onChangeText={(txt) => {
											setStoreQuery(txt);
											setShowStoreList(true);
										}}
										onFocus={() => setShowStoreList(true)}
									/>
								</View>
								{showStoreList && storeQuery.trim().length > 0 && (
									<View style={[styles.storeList, { backgroundColor: cardColor }]}>
										<FlatList
											data={filteredStores}
											keyExtractor={(s) => s.id.toString()}
											showsVerticalScrollIndicator={false}
											style={{ maxHeight: 200 }}
											renderItem={({ item }) => (
												<Pressable
													style={styles.storeItem}
													onPress={() => {
														setSelectedStoreId(item.id);
														setStoreQuery(item.name);
														setShowStoreList(false);
													}}>
													<StoreLogo storeId={item.id} size={32} />
													<Text style={[styles.storeItemText, { color: textColor }]}>
														{item.name}
													</Text>
												</Pressable>
											)}
										/>
									</View>
								)}
							</View>
						)}

						<Text style={[styles.label, { color: textColor }]}>{t("cards.cardNumberLabel")}</Text>
						<View style={styles.inputContainer}>
							<MaterialIcons name="pin" size={20} color="#777" style={styles.icon} />
							<TextInput
								style={[styles.input, { color: textColor }]}
								placeholder={t("cards.cardNumberPlaceholder")}
								placeholderTextColor={textColor}
								value={cardNumber}
								onChangeText={setCardNumber}
								onFocus={handleCloseBottomSheet}
								keyboardType="number-pad"
								maxLength={19}
							/>
							{!cardNumber.trim() && (
								<Pressable
									onPress={() => setCardNumber(generateCardNumber())}
									style={[styles.autoBtn, { backgroundColor: secondaryColor }]}>
									<Text style={styles.autoBtnText}>{t("cards.autoGenerate")}</Text>
								</Pressable>
							)}
						</View>

						<Text style={[styles.label, { color: textColor }]}>{t("cards.importFile")}</Text>
						{file ? (
							<View style={styles.filePreviewContainer}>
								<Image source={{ uri: file }} style={styles.imagePreview} />
								<Pressable style={styles.deleteButton} onPress={handleDeleteFile}>
									<Entypo name="circle-with-cross" size={24} color={danger} />
								</Pressable>
							</View>
						) : (
							<Pressable style={styles.placeholder} onPress={handleOptionFile}>
								<MaterialIcons name="image" size={48} color="black" />
								<Text style={styles.placeholderText}>{t("cards.noPicture")}</Text>
							</Pressable>
						)}

						<View style={styles.ctaContainer}>
							<TouchableOpacity
								style={[styles.button, { backgroundColor: "#28a745" }]}
								onPress={handleOptionFile}>
								<Text style={styles.textButton}>{t("cards.cta.selectFile")}</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={[
								styles.button,
								{ backgroundColor: "#007bff", opacity: canSave ? 1 : 0.5 },
							]}
							onPress={handleSaveNewCard}>
							<Text style={styles.textButton}>{t("cards.cta.save")}</Text>
						</TouchableOpacity>
					</ViewContainer>
					{isVisible && actions.length > 0 && <BottomSheet {...getBottomSheetOptions()} />}
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: { height: "100%" },
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 5,
		alignContent: "center",
		marginTop: 30,
	},
	backButton: {
		alignSelf: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginTop: 14,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
		marginTop: 5,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		height: 40,
	},
	autoBtn: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 6,
	},
	autoBtnText: {
		color: "#fff",
		fontSize: 11,
		fontWeight: "600",
	},
	storeSearchContainer: {
		position: "relative",
		zIndex: 10,
	},
	storeList: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		marginTop: 4,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	storeItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: "#e0e0e0",
	},
	storeItemText: {
		fontSize: 14,
	},
	storeSelected: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginTop: 5,
		gap: 10,
	},
	storeSelectedText: {
		flex: 1,
		fontSize: 14,
		fontWeight: "500",
	},
	placeholder: {
		alignItems: "center",
		justifyContent: "center",
		height: 140,
		backgroundColor: "#eee",
		borderRadius: 10,
		marginVertical: 10,
	},
	placeholderText: {
		color: "black",
	},
	filePreviewContainer: {
		width: "100%",
		position: "relative",
	},
	imagePreview: {
		height: 140,
		borderRadius: 10,
		marginVertical: 10,
		resizeMode: "contain",
	},
	deleteButton: {
		position: "absolute",
		right: 5,
	},
	ctaContainer: {
		display: "flex",
		gap: 20,
	},
	button: {
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	textButton: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
