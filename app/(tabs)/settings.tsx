import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import CardContainer from "@/components/ui/CardContainer";
import ViewContainer from "@/components/ui/ViewContainer";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import useColor from "@/hooks/useColor";
import { useTranslation } from "react-i18next";
import TwoButtonAlert from "@/components/ui/TwoButtonAlert";
import { deleteAllCards } from "@/providers/useDatabase";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const EMAIL_CONTACT = "pygmalion.digitals@gmail.com"; // env

export default function SettingsScreen() {
	const { danger, textColor } = useColor();
	const { t } = useTranslation();

	async function handleClearData() {
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
		<ViewContainer>
			<CardContainer>
				<LanguagePicker />
				<ThemePicker />
				<Pressable
					style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.5 }]}
					onPress={handleOpenContact}>
					<Text style={[styles.label, { color: textColor }]}>{t("settings.contactUs")}</Text>
					<FontAwesome5 name="chevron-right" size={10} color={textColor} />
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
	);
}

const styles = StyleSheet.create({
	clearDataContainer: {
		width: "100%",
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
		fontWeight: 600,
		alignSelf: "center",
	},
	pressable: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
