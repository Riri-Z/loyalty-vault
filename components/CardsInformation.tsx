import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteOneCard } from "@/providers/useDatabase";
import { router } from "expo-router";

type Props = {
	id: number;
	name: string;
	uri: string;
};
export default function CardsInformation({ id, name, uri }: Props) {
	function openCard() {
		router.push("/(tabs)/picture");
	}

	async function handleDeleteFile() {
		await deleteOneCard(+id);
	}

	return (
		<View>
			<Pressable onPress={openCard}>
				<View style={styles.container}>
					<Text>CARDS INFORMATION</Text>
					<Text>{id}</Text>
					<Text>{name}</Text>
					<Text>{uri}</Text>
				</View>
			</Pressable>
			<Pressable onPress={handleDeleteFile}>
				<AntDesign name="minuscircleo" size={24} color="black" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 3,
		padding: 10,
		marginVertical: 10,
		borderBlockColor: "red",
	},
	text: {},
});
