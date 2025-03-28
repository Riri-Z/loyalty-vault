import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useColor from "@/hooks/useColor";

export default function LanguagePicker() {
	const { i18n, t } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); //Init to currrent languages
	const { textColor, bgColor } = useColor();

	// Update i18n language
	function handleChangeLanguage(newLangue: string) {
		setSelectedLanguage(newLangue);
		i18n.changeLanguage(newLangue);
		AsyncStorage.setItem("language", newLangue);
	}

	return (
		<View>
			<Text style={[styles.label, { color: textColor }]}>{t("settings.language")}</Text>
			<Picker
				style={{ color: textColor }}
				selectedValue={selectedLanguage}
				itemStyle={{ backgroundColor: bgColor, color: textColor }} //ios
				dropdownIconColor={textColor}
				onValueChange={(langue: string) => {
					setSelectedLanguage(langue);
					handleChangeLanguage(langue);
				}}>
				{AVAILABLE_LANGUAGES.map((e, index) => {
					return (
						<Picker.Item
							key={`${e} + ${index}`}
							label={t("key_language." + e)}
							style={styles.content}
							value={e}
						/>
					);
				})}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontWeight: 600,
	},
	content: {
		fontWeight: 400,
	},
});
