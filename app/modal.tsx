import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { insertOneCard, deleteAllCards, getAllCards } from "@/providers/useDatabase";
import Animated, { FadeInUp, FadeOutDown, SlideInDown } from "react-native-reanimated";

export default function ModalScreen() {
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
					error = "Nom manquant";
				}
				if (!fileUri) {
					error = "Photo manquant ";
				}
				if (name.length <= 0 && !fileUri) {
					error = "Nom et photo nécessaires";
				}
				alert(error);
			}
		} catch (err) {
			console.error(err);
		}
	}
	async function handleGetAllCards() {
		try {
			await getAllCards();
		} catch (error) {
			console.error(error);
		}
	}
	async function deleteAll() {
		try {
			await deleteAllCards();
		} catch (err) {
			console.error(err);
		}
	}

	function handleDeleteFile() {
		setFileUri(null);
	}
	return (
		<Animated.View
			entering={FadeInUp}
			exiting={FadeOutDown}
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#00000040",
			}}>
			{/* Dismiss modal when pressing outside */}
			<Link href={"/"} asChild>
				<Pressable />
			</Link>
			<Animated.View
				entering={SlideInDown}
				style={{
					width: "100%",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "white",
				}}>
				{isPresented && <Link href="../">Dismiss modal</Link>}

				{/* NAME INPUT */}
				<TextInput onChangeText={onChangeName} value={name} placeholder="Name" />
				{/* PICTURE INPUT */}
				<View>
					<View>
						<Text>Chemin de la photo :</Text>
						<Text>{fileUri ?? "rien de selectionner"}</Text>
					</View>
					{fileUri ? (
						<Pressable onPress={handleDeleteFile}>
							<AntDesign name="minuscircleo" size={24} color="black" />
						</Pressable>
					) : (
						<Button onPress={pickImageAsync} icon="add-circle-outline"></Button>
					)}
				</View>
				{/* CTA */}
				{/* SAVE */}
				<Pressable onPress={handleSaveNewCard}>
					<Text>Save</Text>
				</Pressable>
				{/* GET ALL ,for developping purpose */}
				<Pressable onPress={handleGetAllCards}>
					<Text>get all</Text>
				</Pressable>
				{/* delete ALL ,for developping purpose */}
				<Pressable onPress={deleteAll}>
					<Text>delete all</Text>
				</Pressable>
				<Link href="/">
					<Text>← Go back</Text>
				</Link>
			</Animated.View>
		</Animated.View>
	);
}
type Props = {
	label?: string;
	theme?: "primary";
	icon?: keyof typeof Ionicons.glyphMap;
	onPress?: () => void;
};

export function Button({ label, theme, onPress, icon }: Props) {
	return (
		<View>
			<Pressable onPress={onPress}>
				{!!label && <Text>{label}</Text>}
				{!!icon && <Ionicons name={icon} size={24} color="black" />}
			</Pressable>
		</View>
	);
}
