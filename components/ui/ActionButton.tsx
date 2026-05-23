import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
	onPress: () => void;
	label: string;
};

export const ActionButton = ({ onPress, label }: Props): JSX.Element => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.text}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		alignSelf: "center",
		backgroundColor: "#4CAF50",
		borderRadius: 10,
		height: 50,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 15,
	},
});
