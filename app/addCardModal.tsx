import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import ViewContainer from "@/components/ui/ViewContainer";
import { useCameraPermissions } from "expo-camera";
import RenderCamera from "@/components/RenderCamera";
import BottomSheet from "@/components/ui/BottomSheet";
import { CardContext } from "@/providers/CardContext";
import { Toast } from "toastify-react-native";
import { BottomSheetContext } from "@/providers/BottomSheetContext";

type ModalParamsType = {
	nameCard: string;
	fileCard: string;
	idCard: string;
};

export default function AddCardScreen() {
	/* Context */
	const { updateCard, addCard } = useContext(CardContext);
	const { handleUpdateActions, isVisible, actions, handleCloseBottomSheet } =
		useContext(BottomSheetContext);
	const { textColor, bgColor } = useColor();

	/* State */
	const [name, setName] = useState("");
	const [file, setFile] = useState("");
	const [activeCamera, setActiveCamera] = useState(false); //display camera
	const [permission, requestPermission] = useCameraPermissions();
	const [canSave, setCanSave] = useState(false);

	const { nameCard, fileCard, idCard }: ModalParamsType = useLocalSearchParams();
	const { t, i18n } = useTranslation();

	useEffect(() => {
		if (name !== "" && file !== "") {
			setCanSave(true);
		} else {
			setCanSave(false);
		}
	}, [name, file]);

	useEffect(() => {
		if (nameCard) setName(nameCard);
		if (fileCard) setFile(fileCard);
	}, [nameCard, fileCard]);

	const pickFile = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: false,
			quality: 1,
		});
		if (!result.canceled) {
			setFile(result?.assets[0].uri);
		} else if (!file) {
			Toast.info(t("cards.alert.cancelCamera"));
		}
		handleCloseBottomSheet();
	};

	const handleTakePhoto = (uri: string) => {
		setFile(uri);
		handleCloseBottomSheet();
	};
	async function handleSaveNewCard() {
		try {
			if (name.length <= 0 && !file) {
				return Toast.error(t("cards.alert.NameAndFileMissing"));
			}

			if (name.length <= 0) {
				return Toast.error(t("cards.alert.missingName"));
			}
			if (!file) {
				return Toast.error(t("cards.alert.missingFile"));
			}

			if (idCard) {
				const res = await updateCard({ id: +idCard, name, fileUri: file });
				if (res.success) {
					Toast.success(t("cards.addCardAlert.success"));
				} else {
					Toast.success(t("cards.addCardAlert.failed"));
				}
			} else {
				const res = await addCard({ name, fileUri: file });
				if (res.success) {
					Toast.success(t("cards.addCardAlert.success"));
				} else {
					Toast.success(t("cards.addCardAlert.failed"));
				}
			}

			// close modal and display list of cards
			router.push("/(tabs)");
		} catch (error) {
			console.error(error);
			Toast.error(t("cards.alert.errorCamera"));
		}
	}

	// Reset selected file
	function handleDeleteFile() {
		setFile("");
	}

	// Open camera options, and handle permission
	async function handleOpenCamera() {
		if (!permission) {
			const permissionResult = await requestPermission();
			if (permissionResult.granted) {
				setActiveCamera(true);
			}
		}
		setActiveCamera(true);
	}

	// handle file options
	function handleOptionFile() {
		handleUpdateActions(BOTTOM_SHEET_OPTIONS.actionsItems);
	}

	const BOTTOM_SHEET_OPTIONS = {
		actionsItems: [
			{ label: i18n.t("cards.cta.openCamera"), callback: () => handleOpenCamera() },
			{ label: i18n.t("cards.cta.selectFile"), callback: () => pickFile() },
		],
		handleClose: handleCloseBottomSheet,
	};

	return (
		<>
			{activeCamera ? (
				/* Camera */
				<RenderCamera
					updateUri={(fileUri) => handleTakePhoto(fileUri)}
					closeCamera={() => setActiveCamera(false)}></RenderCamera>
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
							/>
						</View>

						<Text style={[styles.label, { color: textColor }]}>{t("cards.importFile")}</Text>
						{file ? (
							<View style={{ width: "100%", position: "relative" }}>
								<Image source={{ uri: file }} style={styles.imagePreview} />
								<Pressable style={{ position: "absolute", right: 5 }} onPress={handleDeleteFile}>
									<Entypo name="circle-with-cross" size={24} color="red" />
								</Pressable>
							</View>
						) : (
							<Pressable style={styles.placeholder} onPress={handleOptionFile}>
								<MaterialIcons name="image" size={48} color="black" />
								<Text style={{ color: "black" }}>{t("cards.noPicture")}</Text>
							</Pressable>
						)}

						{/* Select file */}
						<View style={styles.ctaContainer}>
							<TouchableOpacity
								style={[styles.button, { backgroundColor: "#28a745" }]}
								onPress={handleOptionFile}>
								<Text style={styles.textButton}>{t("cards.cta.selectFile")} </Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={[
								styles.button,
								{ backgroundColor: "#007bff" },
								{ opacity: canSave ? 1 : 0.5 },
							]}
							onPress={handleSaveNewCard}>
							<Text style={styles.textButton}>{t("cards.cta.save")} </Text>
						</TouchableOpacity>
					</ViewContainer>
					{isVisible && actions.length > 0 && <BottomSheet {...BOTTOM_SHEET_OPTIONS}></BottomSheet>}
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
		marginTop: 10,
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
	placeholder: {
		alignItems: "center",
		justifyContent: "center",
		height: 140,
		backgroundColor: "#eee",
		borderRadius: 10,
		marginVertical: 10,
	},
	imagePreview: {
		height: 140,
		borderRadius: 10,
		marginVertical: 10,
		resizeMode: "contain",
	},
	ctaContainer: {
		display: "flex",
		gap: 20,
	},
	selectButton: {
		backgroundColor: "#007bff",

		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
		flex: 1,
	},
	selectButtonText: {
		color: "white",
		fontWeight: "bold",
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
	addButton: {
		backgroundColor: "#28a745",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
		backgroundColor: "black",
		opacity: 0.8,
	},
});
