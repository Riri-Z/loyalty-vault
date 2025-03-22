import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { insertOneCard, deleteAllCards, deleteOneCard, getAllCards } from "@/providers/useDatabase";

// TODO : - create a context to store cards

export default function ModalScreen() {
	const [name, setName] = useState<string>("");
	const [fileUri, setFileUri] = useState<string | null>(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
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
				const resultPostNewCard = await insertOneCard({ name, fileUri });

				console.log("resultPostNewCard", resultPostNewCard);
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
			console.log(error);
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
			<View style={styles.container}>
				{/* NAME INPUT */}
				<TextInput
					style={styles.input}
					onChangeText={onChangeName}
					value={name}
					placeholder="Name"
				/>
				{/* PICTURE INPUT */}
				<View style={styles.picture_container}>
					<View>
						<Text style={styles.text}>Chemin de la photo :</Text>
						<Text style={styles.text}>{fileUri ?? "rien de selectionner"}</Text>
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
				<Pressable style={styles.save} onPress={handleSaveNewCard}>
					<Text style={styles.text}>Save</Text>
				</Pressable>
				{/* GET ALL ,for developping purpose */}
				<Pressable style={styles.save} onPress={handleGetAllCards}>
					<Text style={styles.text}>get all</Text>
				</Pressable>
				{/* delete ALL ,for developping purpose */}
				<Pressable style={styles.save} onPress={deleteAll}>
					<Text style={styles.text}>delete all</Text>
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
		<View style={styles.buttonContainer}>
			<Pressable style={styles.button} onPress={onPress}>
				{!!label && <Text style={styles.buttonLabel}>{label}</Text>}
				{!!icon && <Ionicons name={icon} size={24} color="black" />}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		alignItems: "center",
		marginVertical: 20,
		gap: 20,
	},
	input: {
		height: 40,
		width: 300,
		borderWidth: 1,
		padding: 10,
	},

	picture_container: {
		width: 300,
		height: 50,
		gap: 2,
		flexDirection: "row",
	},
	text: {
		alignSelf: "center",
		color: "black",
	},
	buttonContainer: {
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
	},
	button: {
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	buttonIcon: {
		// paddingRight: 8,
	},
	buttonLabel: {
		color: "#000000",
		fontSize: 16,
	},

	save: {
		width: 100,
		height: 50,
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "gray",
	},
});
