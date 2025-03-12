import { useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
	const headerRight = () => {
		return (
			<TouchableOpacity onPress={() => router.push("/modal")} style={{ marginRight: 18 }}>
				<FontAwesome name="plus-circle" size={28} color={colors.primary}></FontAwesome>
			</TouchableOpacity>
		);
	};

	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Stack.Screen options={{ headerRight }} />
			<Text>Cards list</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	link: {
		paddingTop: 20,
		fontSize: 20,
	},
	button: {
		color: "red",
	},
});
