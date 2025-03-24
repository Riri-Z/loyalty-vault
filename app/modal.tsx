import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { insertOneCard, deleteAllCards, getAllCards } from "@/providers/useDatabase";

export default function ModalScreen() {
	const [name, setName] = useState<string>("");
	const [uri, setFileUri] = useState<string | null>(null);

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
			if (name !== "" && uri !== null) {
				await insertOneCard({ name, uri });

				// close modal and display list of cards

				router.push("/(tabs)");
			} else {
				let error = "";
				if (name.length <= 0) {
					error = "Nom manquant";
				}
				if (!uri) {
					error = "Photo manquant ";
				}
				if (name.length <= 0 && !uri) {
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
			console.log("called");
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
		<SafeAreaView>
			<Stack.Screen
				options={{
					title: "Ajouter une nouvelle carte",
				}}
			/>
			<View>
				{/* NAME INPUT */}
				<TextInput onChangeText={onChangeName} value={name} placeholder="Name" />
				{/* PICTURE INPUT */}
				<View>
					<View>
						<Text>Chemin de la photo :</Text>
						<Text className="text-purple-500 dark:text-yellow-400">
							{uri ?? "rien de selectionner"}
						</Text>
					</View>
					{uri ? (
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
			</View>
		</SafeAreaView>
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
