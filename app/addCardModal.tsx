import React, { useEffect, useState } from "react";
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
import { insertOneCard, updateOne } from "@/providers/useDatabase";
import { useTranslation } from "react-i18next";
import useColor from "@/hooks/useColor";
import ViewContainer from "@/components/ui/ViewContainer";
import { useCameraPermissions } from "expo-camera";
import RenderCamera from "@/components/RenderCamera";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@/components/ui/BottomSheet";

type ModalParamsType = {
	nameCard: string;
	fileCard: string;
	idCard: string;
};

export default function AddCardScreen() {
	const { nameCard, fileCard, idCard }: ModalParamsType = useLocalSearchParams();
	const { t, i18n } = useTranslation();
	const { textColor } = useColor();
	const [name, setName] = useState("");
	const [file, setFile] = useState("");
	const [permission, requestPermission] = useCameraPermissions();

	const [activeCamera, setActiveCamera] = useState(false); //display camera

	const [openFile, setOpenFile] = useState(false);

	useEffect(() => {
		if (nameCard) setName(nameCard);
		if (fileCard) setFile(fileCard);
	}, [nameCard, fileCard]);

	const pickFile = async () => {
		setOpenFile(false);
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: false,
			quality: 1,
		});
		if (!result.canceled) {
			setFile(result?.assets[0].uri);
		} else if (!file) {
			alert("You did not select any image.");
		}
	};
	async function handleSaveNewCard() {
		try {
			if (name.length <= 0 && !file) {
				return alert(t("cards.alert.NameAndFileMissing"));
			}

			if (name.length <= 0) {
				return alert(t("cards.alert.missingName"));
			}
			if (!file) {
				return alert(t("cards.alert.missingFile"));
			}

			if (idCard) {
				await updateOne({ id: +idCard, name, fileUri: file });
			} else {
				await insertOneCard({ name, fileUri: file });
			}

			// close modal and display list of cards
			router.push("/(tabs)");
		} catch (error) {
			console.error(error);
		}
	}

	function handleDeleteFile() {
		setFile("");
	}

	async function handleOpenCamera() {
		setOpenFile(false);
		if (!permission) {
			const permissionResult = await requestPermission();
			if (permissionResult.granted) {
				setActiveCamera(true);
			}
		}
		setActiveCamera(true);
	}

	function handleOptionFile() {
		setOpenFile((prev) => !prev);
	}

	const BOTTOM_SHEET_OPTIONS = {
		actionsItems: [
			{ label: i18n.t("cards.cta.openCamera"), callback: () => handleOpenCamera() },
			{ label: i18n.t("cards.cta.selectFile"), callback: () => pickFile() },
		],
		handleClose: handleOptionFile,
	};

	return (
		<>
			{activeCamera ? (
				/* Camera */
				<RenderCamera
					updateUri={(uri) => setFile(uri)}
					closeCamera={() => setActiveCamera(false)}></RenderCamera>
			) : (
				<>
					<ViewContainer>
						<View style={styles.header}>
							<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
								<Ionicons name="arrow-back" size={24} color={textColor} />
							</TouchableOpacity>
							<Text style={[styles.title, { color: textColor }]}>{t("cards.addCard")}</Text>
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
							<Pressable style={styles.placeholder} onPress={pickFile}>
								<MaterialIcons name="image" size={48} color="black" />
								<Text style={{ color: "black" }}>{t("cards.noPicture")}</Text>
							</Pressable>
						)}

						{/* Select file */}
						<View style={styles.ctaContainer}>
							<TouchableOpacity style={styles.selectButton} onPress={handleOptionFile}>
								<Text style={styles.selectButtonText}>{t("cards.cta.selectFile")} </Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={[styles.addButton]} onPress={handleSaveNewCard}>
							<Text style={styles.addButtonText}>{t("cards.cta.save")} </Text>
						</TouchableOpacity>
					</ViewContainer>
					{openFile && (
						<GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject, zIndex: 2 }}>
							<Pressable onPress={handleOptionFile} style={styles.overlay}></Pressable>
							<BottomSheet {...BOTTOM_SHEET_OPTIONS} />
						</GestureHandlerRootView>
					)}
				</>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 5,
		alignContent: "center",
		marginTop: 15,
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
		flexDirection: "row",
		gap: 15,
	},
	selectButton: {
		backgroundColor: "#007bff",
		width: 20,
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
