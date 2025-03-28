import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import CardContainer from "@/components/ui/CardContainer";
import ViewContainer from "@/components/ui/ViewContainer";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useColor from "@/hooks/useColor";
import { useTranslation } from "react-i18next";
import TwoButtonAlert from "@/components/ui/TwoButtonAlert";
import { deleteAllCards } from "@/providers/useDatabase";

export default function SettingsScreen() {
	const { danger } = useColor();
	const { t } = useTranslation();

	async function handleClearData() {
		try {
			const res = await deleteAllCards();
			if (res) {
				alert("Suppression effectué  ");
			}
		} catch (error) {
			console.error(error);
			alert("Erreur lors de la suppression");
		}
		console.log("called clear");
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

	return (
		<ViewContainer>
			<CardContainer>
				<LanguagePicker />
				<ThemePicker />
			</CardContainer>
			{/* CTA delete data */}
			<View style={[styles.clearDataContainer, { backgroundColor: danger }]}>
				<Pressable onPress={handleopenCleardataAlert}>
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
});
