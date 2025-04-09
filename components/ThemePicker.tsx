import { View, Text, Switch, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import { Fontisto, Octicons } from "@expo/vector-icons";

export default function ThemePicker() {
	const { t } = useTranslation();
	const { textColor, isDarkModeOn, toggleTheme } = useColor();

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
					onValueChange={toggleTheme}
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
