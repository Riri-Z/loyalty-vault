import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	name: string;
	uri: string;
};
export default function CardsInformation({ name, uri }: Props) {
	function openCard() {
		console.log(name + " pressed");
	}
	return (
		<Pressable onPress={openCard}>
			<View style={styles.container}>
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
	},
	text: {},
});
