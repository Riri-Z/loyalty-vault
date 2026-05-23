import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColor } from "@/providers/ThemeContext";

type Props = {
	newLanguage: string;
};

export const LanguagePicker = ({ newLanguage }: Props): JSX.Element => {
	const { i18n, t } = useTranslation();
	const { textColor } = useColor();

	const handleChangeLanguage = useCallback(
		(lang: string): void => {
			i18n.changeLanguage(lang);
			AsyncStorage.setItem("language", lang);
		},
		[i18n],
	);

	useEffect(() => {
		handleChangeLanguage(newLanguage);
	}, [newLanguage, handleChangeLanguage]);

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: textColor }]}>{t("settings.language")}</Text>
			<Text style={styles.itemValue}>{t("key_language." + newLanguage)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
	label: {
		fontSize: 16,
		color: "#888",
	},
	itemValue: {
		fontSize: 16,
		color: "#888",
	},
});
