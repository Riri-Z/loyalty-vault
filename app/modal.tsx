import { Link, router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { insertOneCard } from "@/providers/useDatabase";
import Animated, { FadeInUp, FadeOutDown, SlideInDown } from "react-native-reanimated";
import useColor from "@/hooks/useColor";
import { useTranslation } from "react-i18next";
import ImageViewer from "@/components/ImageViewer";

export default function ModalScreen() {
	const { t, i18n } = useTranslation();
	const { textColor, bgColor, cardColor } = useColor();
	const isPresented = router.canGoBack();

	const [name, setName] = useState<string>("");
	const [fileUri, setFileUri] = useState<string | null>(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: false,
			quality: 1,
		});
		if (!result.canceled) {
			setFileUri(result?.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};

	function onChangeName(newName: string) {
		setName(newName);
	}

	async function handleSaveNewCard() {
		try {
			if (name !== "" && fileUri !== null) {
				await insertOneCard({ name, fileUri });

				// close modal and display list of cards
				router.push("/(tabs)");
			} else {
				let error = "";
				if (name.length <= 0) {
					error = "cards.alert.missingName";
				}
				if (!fileUri) {
					error = "cards.alert.missingFile";
				}
				if (name.length <= 0 && !fileUri) {
					error = "cards.alert.NameAndFileMissing";
				}
				console.log("error", error);
				alert(t(error));
			}
		} catch (err) {
			console.error(err);
		}
	}

	function handleDeleteFile() {
		setFileUri(null);
	}
	return (
		<View style={styles.container}>
			{isPresented && <Link href="../"></Link>}
			{/* NAME INPUT */}
			<TextInput
				style={[styles.textInput, { color: textColor }]}
				onChangeText={onChangeName}
				value={name}
				placeholder={t("cards.name")}
			/>
			{/* PICTURE INPUT */}
			<View style={styles.container}>
				<View style={styles.fileContainer}>
					<Text>{t("cards.file")}</Text>
					{!fileUri && <Text style={styles.textUri}>{t("cards.addCard")}</Text>}
				</View>
				{fileUri && (
					<View
						style={{
							flexDirection: "row",
							marginVertical: 10,
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						{/* <Text style={styles.textUri}>{fileUri}</Text> */}
						<ImageViewer imgSource={fileUri}></ImageViewer>
						<Pressable style={{}} onPress={handleDeleteFile}>
							<AntDesign name="minuscircleo" size={24} color="black" />
						</Pressable>
					</View>
				)}
			</View>
			{/* CTA */}
			{/* Add */}
			<View style={styles.cta}>
				{fileUri ? (
					<Button onPress={handleSaveNewCard} title={t("cards.cta.save")}></Button>
				) : (
					<Button onPress={pickImageAsync} title={t("cards.cta.selectFile")}></Button>
				)}
			</View>

			<Link style={{ width: 100, marginHorizontal: "auto" }} href="/">
				<Text>← Go back</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		marginHorizontal: "auto",
		gap: 10,

		height: "80%",
	},
	cta: {},
	fileContainer: {
		gap: 10,
	},
	switchContainer: {
		flexDirection: "row",
	},
	textInput: {
		height: 60,
		margin: 12,

		fontSize: 20,
		borderRadius: 10,
		borderWidth: 1,
		padding: 10,
	},
	textUri: {
		width: "90%",
		fontWeight: "bold",
	},
	switch: {
		marginHorizontal: 5,
	},
});
