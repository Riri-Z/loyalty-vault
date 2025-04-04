import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeProvider";
import ViewContainer from "@/components/ui/ViewContainer";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	const { textColor, bgColor } = useColor();

	return (
		<ScrollView style={{ backgroundColor: bgColor }}>
			<ViewContainer>
				<Text style={[styles.title, { color: textColor }]}>{t("privacyPolicy.title")}</Text>
				<View style={styles.lastUpdate}>
					<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.lastUpdate")}</Text>
					<Text style={[styles.text, { color: textColor }]}>March. 02 2025</Text>
				</View>
				<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.welcome")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("privacyPolicy.section1Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.section1Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("privacyPolicy.section2Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.section2Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("privacyPolicy.section3Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.section3Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("privacyPolicy.section4Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("privacyPolicy.section4Text")}</Text>
			</ViewContainer>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 20,
	},
	lastUpdate: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontWeight: 500,
		fontSize: 16,
	},
});
