import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useColor from "@/hooks/useColor";

export default function LanguagePicker() {
	const { i18n } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); //Init to currrent languages
	const { color } = useColor();

	// Update i18n language
	function handleChangeLanguage(newLangue: string) {
		setSelectedLanguage(newLangue);
		i18n.changeLanguage(newLangue);
		AsyncStorage.setItem("language", newLangue);
	}

	return (
		<View style={{ padding: 5 }}>
			<Text style={{ color: color }}>Langues</Text>
			<Picker
				style={{ color: color }}
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
