import { LanguagePicker } from "@/components/shared/LanguagePicker";
import { ThemePicker } from "@/components/shared/ThemePicker";
import { CardContainer } from "@/components/ui/CardContainer";
import { ViewContainer } from "@/components/ui/ViewContainer";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColor } from "@/providers/ThemeContext";
import { useTranslation } from "react-i18next";
import { TwoButtonAlert } from "@/components/ui/TwoButtonAlert";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardContext } from "@/providers/CardContext";
import Toast from "react-native-toast-message";
import { AVAILABLE_LANGUAGES } from "@/constants/languages";
import { BottomSheetContext } from "@/providers/BottomSheetContext";

const EMAIL_CONTACT = process.env.EXPO_PUBLIC_CONTACT;

type ActionItem = {
	label: string;
	callback: () => void;
};

export default function SettingsScreen(): JSX.Element {
	const { danger, textColor } = useColor();
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const { clearDataCards } = useContext(CardContext);
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

	const { handleCloseBottomSheet, handleDisplayBottomSheet, handleUpdateActions } = useContext(BottomSheetContext);

	const handleClearData = async (): Promise<void> => {
		await resetOnBoardingScreen();
		const res = await clearDataCards();
		if (res.success) {
			Toast.show({
				type: "success",
				text1: t("cards.clearApp.success"),
			});
		} else {
			Toast.show({
				type: "error",
				text1: t("cards.clearApp.failed"),
			});
		}
	};

	const handleToggleLangueOption = (): void => {
		handleUpdateActions(getBottomSheetOptions().actionsItems);
		handleDisplayBottomSheet(true);
	};

	const resetOnBoardingScreen = async (): Promise<void> => {
		await AsyncStorage.removeItem("onBoardingSteps");
	};

	const updateLanguage = (lang: string): void => {
		setSelectedLanguage(lang);
		handleCloseBottomSheet();
	};

	const getBottomSheetOptions = (): { actionsItems: ActionItem[]; handleClose: () => void } => ({
		actionsItems: Object.keys(AVAILABLE_LANGUAGES).map((key) => ({
			label: t(`key_language.${AVAILABLE_LANGUAGES[key as keyof typeof AVAILABLE_LANGUAGES]}`),
			callback: () => updateLanguage(AVAILABLE_LANGUAGES[key as keyof typeof AVAILABLE_LANGUAGES]),
		})),
		handleClose: handleToggleLangueOption,
	});

	const handleOpenClearDataAlert = async (): Promise<void> => {
		return TwoButtonAlert({
			title: t("settings.cleanData.confirmationTitle"),
			content: t("settings.cleanData.confirmationContent"),
			textCancel: t("cards.deleteAlert.cancel"),
			textOk: t("cards.deleteAlert.ok"),
			handleOk: handleClearData,
		});
	};

	const handleOpenContact = async (): Promise<void> => {
		return TwoButtonAlert({
			title: "Contact",
			content: `${process.env.EXPO_PUBLIC_CONTACT}`,
			textCancel: t("cards.deleteAlert.cancel"),
			textOk: t("settings.copy"),
			handleOk: copyContactToClipBoard,
		});
	};

	const copyContactToClipBoard = async (): Promise<void> => {
		await Clipboard.setStringAsync(EMAIL_CONTACT ?? "");
		const res = await Clipboard.hasStringAsync();
		if (res) {
			Toast.show({
				type: "success",
				text1: t("settings.successCopy"),
			});
		} else {
			Toast.show({
				type: "error",
				text1: t("settings.failedCopy"),
			});
		}
	};

	return (
		<ViewContainer>
			<Text style={{ color: textColor, fontSize: 20, gap: 10 }}>{t("settings.personalization")}</Text>
			<CardContainer>
				<Pressable onPress={handleToggleLangueOption}>
					<LanguagePicker newLanguage={selectedLanguage} />
				</Pressable>
				<ThemePicker />
			</CardContainer>
			<CardContainer>
				<Pressable style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]} onPress={handleOpenContact}>
					<Text style={[styles.label, { color: textColor }]}>{t("settings.contactUs")}</Text>
					<FontAwesome5 name="angle-right" size={15} color={textColor} />
				</Pressable>
				<Pressable
					style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
					onPress={() => router.navigate("/CGU")}>
					<Text style={[styles.label, { color: textColor }]}>{t("settings.cgu")}</Text>
					<FontAwesome5 name="angle-right" size={15} color={textColor} />
				</Pressable>
				<Pressable
					style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
					onPress={() => router.navigate("/PrivacyPolicy")}>
					<Text style={[styles.label, { color: textColor }]}>{t("settings.privacyPolicy")}</Text>
					<FontAwesome5 name="angle-right" size={15} color={textColor} />
				</Pressable>
			</CardContainer>
			<View style={[styles.clearDataContainer, { backgroundColor: danger }]}>
				<Pressable onPress={handleOpenClearDataAlert} style={({ pressed }) => pressed && { opacity: 0.5 }}>
					<Text style={styles.clearDataText}>{t("settings.cleanData.button")}</Text>
				</Pressable>
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	clearDataContainer: {
		marginTop: 20,
		height: 50,
		justifyContent: "center",
		borderRadius: 10,
	},
	clearDataText: {
		alignSelf: "center",
		fontWeight: 600,
		fontSize: 16,
		color: "white",
	},
	label: {
		fontSize: 16,
		color: "#fff",
	},
	itemValue: {
		fontSize: 16,
		color: "#888",
	},
	pressable: {
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
