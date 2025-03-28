import React, { useState } from "react";
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
import { router } from "expo-router";
import { insertOneCard } from "@/providers/useDatabase";
import { useTranslation } from "react-i18next";
import useColor from "@/hooks/useColor";
import ViewContainer from "@/components/ui/ViewContainer";

export default function AddCardScreen() {
	const { t } = useTranslation();
	const { textColor } = useColor();

	const [name, setName] = useState("");
	const [file, setFile] = useState<string | null>(null);

	const pickFile = async () => {
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

			await insertOneCard({ name, fileUri: file });

			// close modal and display list of cards
			router.push("/(tabs)");
		} catch (error) {
			console.error(error);
		}
	}

	function handleDeleteFile() {
		setFile(null);
	}

	return (
		<ViewContainer>
			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name="arrow-back" size={24} color={textColor} />
			</TouchableOpacity>

			<Text style={[styles.title, { color: textColor }]}>{t("cards.addCard")}</Text>

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

			<Text style={[styles.label, { color: textColor }]}>Importer une image</Text>
			{file ? (
				<View style={{ width: "100%", position: "relative" }}>
					<Image source={{ uri: file }} style={styles.imagePreview} />
					<Pressable style={{ position: "absolute", right: 5 }} onPress={handleDeleteFile}>
						<Entypo name="circle-with-cross" size={24} color="red" />
					</Pressable>
				</View>
			) : (
				<Pressable style={styles.placeholder} onPress={pickFile}>
					<MaterialIcons name="image" size={48} color="#ccc" />
					<Text style={{ color: "#ccc" }}>{t("cards.noPicture")}</Text>
				</Pressable>
			)}

			<TouchableOpacity style={styles.selectButton} onPress={pickFile}>
				<Text style={styles.selectButtonText}> {t("cards.cta.selectFile")} </Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.addButton} onPress={handleSaveNewCard}>
				<Text style={styles.addButtonText}>{t("cards.cta.save")} </Text>
			</TouchableOpacity>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	backButton: {
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
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
		height: 120,
		backgroundColor: "#eee",
		borderRadius: 10,
		marginVertical: 10,
	},
	imagePreview: {
		// width: "100%",
		height: 120,
		borderRadius: 10,
		marginVertical: 10,
		resizeMode: "contain",
	},
	selectButton: {
		backgroundColor: "#007bff",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	selectButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	addButton: {
		backgroundColor: "#28a745",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
