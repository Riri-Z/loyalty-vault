import { useEffect, useState } from "react";
import { View, Text, Switch, useColorScheme, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import useColor from "@/hooks/useColor";

export default function ThemePicker() {
	const { t } = useTranslation();
	const { color } = useColor();

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
		<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
			<Text style={{ color: color, alignSelf: "center" }}>{t("settings.apparences")} </Text>
			<View style={{ flexDirection: "row" }}>
				<Text style={{ color: color, alignSelf: "center" }}>{t("settings.light")}</Text>
				<Switch
					style={{}}
					trackColor={{ false: "#", true: "#81b0ff" }}
					thumbColor="#339c3a"
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isDarkModeOn}
				/>
				<Text style={{ color: color, alignSelf: "center" }}>{t("settings.dark")}</Text>
			</View>
		</View>
	);
}
