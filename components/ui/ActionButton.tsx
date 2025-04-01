import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ActionButton = ({ onPress, label }: { onPress: () => void; label: string }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.text}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		alignSelf: "center",
		backgroundColor: "#C4A484",
		borderRadius: 10,
		height: 50,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "black",
		fontWeight: "bold",
		fontSize: 15,
	},
});
