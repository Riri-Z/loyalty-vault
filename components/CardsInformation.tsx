import { Pressable, Text, View } from "react-native";
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
				<View>
					<Text className="text-black dark:text-red-500">id: {id}</Text>
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
