import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import CardContainer from "@/components/ui/CardContainer";
import ViewContainer from "@/components/ui/ViewContainer";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useColor } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import TwoButtonAlert from "@/components/ui/TwoButtonAlert";
import { deleteAllCards } from "@/providers/useDatabase";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMAIL_CONTACT = "pygmalion.digitals@gmail.com"; // env

export default function SettingsScreen() {
	const { danger, textColor } = useColor();
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); //Init to currrent languages

	const [openLangueOption, setopenLangueOption] = useState(false);

	// Clear database, and storage
	async function handleClearData() {
		resetOnBoardingScreen();
		try {
			const res = await deleteAllCards();
			if (res) {
				alert(t("cards.deleteAlert.success"));
			}
		} catch (error) {
			console.error(error);
			alert(t("cards.deleteAlert.failed"));
		}
	}

	const handleToggleLangueOption = () => {
		setopenLangueOption((prev) => !prev);
	};

	async function resetOnBoardingScreen() {
		await AsyncStorage.removeItem("onBoardingSteps", () => console.log("cleared onBoardingSteps"));
	}

	const updateLanguage = (langue: string) => {
		setSelectedLanguage(langue);
		handleToggleLangueOption();
	};
	const BOTTOM_SHEET_OPTIONS = {
		actionsItems: [
			{ label: i18n.t("key_language.en"), callback: () => updateLanguage("en") },
			{ label: i18n.t("key_language.fr"), callback: () => updateLanguage("fr") },
		],
		handleClose: handleToggleLangueOption,
	};

	async function handleopenCleardataAlert() {
		return TwoButtonAlert({
			title: t("settings.cleanData.confirmationTitle"),
			content: t("settings.cleanData.confirmationContent"),
			textCancel: t("cards.deleteAlert.cancel"),
			textOk: t("cards.deleteAlert.ok"),
			handleOk: handleClearData,
		});
	}

	function handleOpenContact() {
		return Alert.alert("Contact", "pygmalion.digitals@gmail.com", [
			{ text: t("settings.copy"), onPress: () => copyContactToClipBoard },
		]);
	}
	async function copyContactToClipBoard() {
		return await Clipboard.setStringAsync(EMAIL_CONTACT);
	}

	return (
		<>
			<ViewContainer>
				<Text style={{ color: textColor, fontSize: 20, gap: 10 }}>
					{t("settings.personalisation")}
				</Text>
				<CardContainer>
					<Pressable onPress={handleToggleLangueOption}>
						<LanguagePicker newLanguage={selectedLanguage} />
					</Pressable>
					<ThemePicker />
				</CardContainer>
				<CardContainer>
					{/* Contact us */}
					<Pressable
						style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
						onPress={handleOpenContact}>
						<Text style={[styles.label, { color: textColor }]}>{t("settings.contactUs")}</Text>
						<FontAwesome5 name="angle-right" size={15} color={textColor} />
					</Pressable>
					{/* Terms of service */}
					<Pressable
						style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
						onPress={() => router.navigate("/CGU")}>
						<Text style={[styles.label, { color: textColor }]}>{t("settings.cgu")}</Text>
						<FontAwesome5 name="angle-right" size={15} color={textColor} />
					</Pressable>
					{/* Privacy policy */}
					<Pressable
						style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
						onPress={() => router.navigate("/PrivacyPolicy")}>
						<Text style={[styles.label, { color: textColor }]}>{t("settings.privacyPolicy")}</Text>
						<FontAwesome5 name="angle-right" size={15} color={textColor} />
					</Pressable>
				</CardContainer>
				{/* CTA delete data */}
				<View style={[styles.clearDataContainer, { backgroundColor: danger }]}>
					<Pressable
						onPress={handleopenCleardataAlert}
						style={({ pressed }) => pressed && { opacity: 0.5 }}>
						<Text style={[styles.text]}>{t("settings.cleanData.button")}</Text>
					</Pressable>
				</View>
			</ViewContainer>
			{openLangueOption && (
				<GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject, zIndex: 2 }}>
					<Pressable onPress={handleToggleLangueOption} style={styles.overlay} />
					<BottomSheet {...BOTTOM_SHEET_OPTIONS} />
				</GestureHandlerRootView>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	clearDataContainer: {
		marginTop: 20,
		height: 50,
		justifyContent: "center",
		borderRadius: 10,
	},
	text: {
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
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
		backgroundColor: "black",
		opacity: 0.8,
	},
});
