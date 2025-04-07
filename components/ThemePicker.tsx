import { useEffect, useState } from "react";
import { View, Text, Switch, useColorScheme, Appearance, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeProvider";
import { Fontisto, Octicons } from "@expo/vector-icons";

export default function ThemePicker() {
	const { t } = useTranslation();
	const { textColor } = useColor();

	const colorScheme = useColorScheme();
	const [isDarkModeOn, setIsDarkModeOn] = useState(colorScheme === "dark");

	const toggleSwitch = (activateDarkMode: boolean) => {
		Appearance.setColorScheme(activateDarkMode ? "dark" : "light");
		setIsDarkModeOn((prev) => !prev);
	};

	// Save to storage
	useEffect(() => {
		AsyncStorage.setItem("theme", colorScheme ?? "light");
	}, [colorScheme]);

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: textColor }]}>{t("settings.apparences")} </Text>
			<View style={styles.switchContainer}>
				<Fontisto
					style={[styles.content]}
					name="day-sunny"
					size={18}
					color={isDarkModeOn ? "white" : "black"}
				/>
				<Switch
					style={styles.switch}
					trackColor={{ false: "#", true: "#81b0ff" }}
					thumbColor={isDarkModeOn ? "black" : "yellow"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isDarkModeOn}
				/>
				<Octicons
					style={[styles.content]}
					name="moon"
					size={18}
					color={isDarkModeOn ? "white" : "black"}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	switchContainer: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 16,
		alignSelf: "center",
	},
	content: {
		alignSelf: "center",
		fontWeight: 400,
	},
	switch: {
		marginHorizontal: 1,
		alignSelf: "flex-start",
	},
	pressable: {
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
});
