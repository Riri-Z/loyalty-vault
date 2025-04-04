import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useColor from "@/hooks/useColor";

export default function LanguagePicker({ newLanguage }: { newLanguage: string }) {
	const { i18n, t } = useTranslation();
	const { textColor, bgColor } = useColor();

	// Update i18n language
	const handleChangeLanguage = useCallback(
		(newLangue: string) => {
			i18n.changeLanguage(newLangue);
			AsyncStorage.setItem("language", newLangue);
		},
		[i18n],
	);
	useEffect(() => {
		return handleChangeLanguage(newLanguage);
	}, [newLanguage, handleChangeLanguage]);

	return (
		<View
			style={{
				flexDirection: "row",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 10,
			}}>
			<Text style={[styles.label, { color: textColor }]}>{t("settings.language")}</Text>
			<Text style={styles.itemValue}>{t("key_language." + newLanguage)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		color: "#888", // Couleur plus claire ou plus foncée
	},
	itemValue: {
		fontSize: 16,
		color: "#888", // Couleur plus claire ou plus foncée
	},
	content: {},
});
