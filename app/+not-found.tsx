import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
	const { colors } = useTheme();

	return (
		<>
			<Stack.Screen options={{ title: "Ooops , not found ! " }} />
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Link style={styles.button} href="/(tab)/index/">
					Go back to home screen !
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},

	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});
