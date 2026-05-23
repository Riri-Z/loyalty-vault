import { useColor } from "@/providers/ThemeContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export const AddCardButton = (): JSX.Element => {
	const { secondaryColor } = useColor();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => router.push("/addCardModal")}
				style={[styles.addButton, { backgroundColor: secondaryColor }]}>
				<Entypo name="plus" size={55} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	addButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		alignItems: "center",
		justifyContent: "center",
		elevation: 3,
	},
});
