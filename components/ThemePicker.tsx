import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Appearance, Platform, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThemePicker() {
	const { colors, dark } = useTheme();

	const [isDarkModeOn, setisDarkModeOn] = useState(dark);

	// Update theme color, and save it to storage
	useEffect(() => {
		const newThemeColor = isDarkModeOn ? "dark" : "light";
		if (!newThemeColor) {
			return Appearance.setColorScheme("light");
		} else {
			Appearance.setColorScheme(newThemeColor);
		}

		AsyncStorage.setItem("theme", newThemeColor);
	}, [isDarkModeOn]);

	const toggleSwitch = () => {
		setisDarkModeOn((previousState) => !previousState);
	};
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text style={[styles.text, { color: colors.text }]}>Light</Text>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={isDarkModeOn ? "#3e3e3e" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isDarkModeOn}
			/>
			<Text style={[styles.text, { color: colors.text }]}>Dark</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		color: "#ffff",
	},
	option: {
		height: 50,
		width: 125,
		color: "#fff",
		...(Platform.OS === "android" ? { backgroundColor: "#333" } : {}),
	},
});
