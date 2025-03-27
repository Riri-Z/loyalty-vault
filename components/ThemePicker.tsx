import { useEffect, useState } from "react";
import { View, Text, Switch, useColorScheme, Appearance, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import useColor from "@/hooks/useColor";

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
			<Text style={[styles.text, { color: textColor }]}>{t("settings.apparences")} </Text>
			<View style={styles.switchContainer}>
				<Text style={[styles.text, { color: textColor }]}>{t("settings.light")}</Text>
				<Switch
					style={styles.switch}
					trackColor={{ false: "#", true: "#81b0ff" }}
					thumbColor="#339c3a"
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isDarkModeOn}
				/>
				<Text style={[styles.text, { color: textColor }]}>{t("settings.dark")}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	switchContainer: {
		flexDirection: "row",
	},
	text: {
		alignSelf: "center",
	},
	switch: {
		marginHorizontal: 5,
	},
});
