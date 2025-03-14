import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LanguagePicker() {
	const { i18n } = useTranslation();
	const { colors } = useTheme();
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); //Init to currrent languages

	// Update i18n language
	function handleChangeLanguage(newLangue: string) {
		setSelectedLanguage(newLangue);
		i18n.changeLanguage(newLangue);
		AsyncStorage.setItem("language", newLangue);
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text style={[styles.text, { color: colors.text }]}>Langue : </Text>
			<Picker
				style={styles.pickerStyle}
				selectedValue={selectedLanguage}
				onValueChange={(langue: string) => {
					setSelectedLanguage(langue);
					handleChangeLanguage(langue);
				}}>
				{AVAILABLE_LANGUAGES.map((e, index) => {
					return <Picker.Item key={`${e} + ${index}`} label={e.toUpperCase()} value={e} />;
				})}
			</Picker>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		color: "#fff",
	},
	pickerStyle: {
		height: 50,
		width: 100,
		color: "#fff",
		...(Platform.OS === "android" ? { backgroundColor: "#333" } : {}),
	},
});
