import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Appearance, Platform, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";

type ColorOptions = "light" | "dark";

export default function ThemePicker() {
	const { colors } = useTheme();

	const { dark } = useTheme();

	const [isDarkMode, setIsDarkMode] = useState(dark);

	const [currentTheme] = useState<ColorOptions>(dark ? "dark" : "light");

	useEffect(() => {
		const newThemeColor = isDarkMode ? "dark" : "light";
		if (!newThemeColor) {
			return Appearance.setColorScheme("light");
		} else {
			Appearance.setColorScheme(newThemeColor);
		}
	}, [isDarkMode]);

	const toggleSwitch = () => {
		setIsDarkMode((previousState) => !previousState);
		Appearance.setColorScheme(currentTheme);
	};
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text style={[styles.text, { color: colors.text }]}>Light</Text>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={isDarkMode ? "#3e3e3e" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isDarkMode}
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
