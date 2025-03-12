import { View, Text, StyleSheet } from "react-native";

export default function AddCardScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Add Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#fff",
	},
});
