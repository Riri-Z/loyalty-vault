import { View, Text, Switch, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import { Fontisto, Octicons } from "@expo/vector-icons";

export const ThemePicker = (): JSX.Element => {
	const { t } = useTranslation();
	const { textColor, isDarkModeOn, toggleTheme } = useColor();

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: textColor }]}>{t("settings.theme")} </Text>
			<View style={styles.switchContainer}>
				<Fontisto
					style={styles.content}
					name="day-sunny"
					size={18}
					color={isDarkModeOn ? "white" : "black"}
				/>
				<Switch
					style={styles.switch}
					trackColor={{ false: "#e0e0e0", true: "#81b0ff" }}
					thumbColor={isDarkModeOn ? "#333" : "#f5c518"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleTheme}
					value={isDarkModeOn}
				/>
				<Octicons
					style={styles.content}
					name="moon"
					size={18}
					color={isDarkModeOn ? "white" : "black"}
				/>
			</View>
		</View>
	);
};

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
});
