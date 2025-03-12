import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export default function AboutScreen() {
	const { colors } = useTheme();
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={{ color: colors.text }}>About Screen</Text>
			<Text style={{ color: colors.text }}>Traduction : {t("language")}</Text>
			<Text>{colors.text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},
});
