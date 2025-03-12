import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translation.json";
import translationFr from "./locales/fr/translation.json";

const resources = {
	en: { translation: translationEn },
	fr: { translation: translationFr },
};

const initI18n = async () => {
	let savedLanguage = await AsyncStorage.getItem("language");
	if (!savedLanguage) {
		savedLanguage = getLocales()[0].languageCode ?? "en";
	}

	i18n.use(initReactI18next).init({
		fallbackLng: ["en"],
		resources,
		lng: savedLanguage,
		debug: true,
	});
};

initI18n();

export default initI18n;
