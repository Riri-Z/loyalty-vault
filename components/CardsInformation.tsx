import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	name: string;
	uri: string;
};
export default function CardsInformation({ name, uri }: Props) {
	console.log("cards", name);
	console.log("uri", uri);

	function openCard() {
		console.log(name + " pressed");
	}
	return (
		<Pressable onPress={openCard}>
			<View style={styles.container}>
				<Text>CARDS INFORMATION</Text>
				<Text>{name}</Text>
				<Text>{uri}</Text>
			</View>
		</Pressable>
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
