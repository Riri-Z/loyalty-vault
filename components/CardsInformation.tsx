import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteOneCard } from "@/providers/useDatabase";

type Props = {
	id: number;
	name: string;
	uri: string;
	openCardDetail: () => void;
};
export default function CardsInformation({ id, name, uri, openCardDetail }: Props) {
	async function handleDeleteFile() {
		await deleteOneCard(+id);
	}

	return (
		<View>
			<Pressable onPress={openCardDetail}>
				<View style={styles.container}>
					<Text>id: {id}</Text>
					<Text>name : {name}</Text>
					<Text>uri : {uri}</Text>
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
