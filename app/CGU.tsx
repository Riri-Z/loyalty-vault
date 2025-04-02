import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import ViewContainer from "@/components/ui/ViewContainer";
import useColor from "@/hooks/useColor";

export default function CGU() {
	const { t } = useTranslation();
	const { textColor, bgColor } = useColor();

	return (
		<ScrollView style={{ backgroundColor: bgColor }}>
			<ViewContainer>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.title")}</Text>
				<View style={styles.lastUpdate}>
					<Text style={[styles.text, { color: textColor }]}>{t("terms.lastUpdate")}</Text>
					<Text style={[styles.text, { color: textColor }]}>March. 02 2025</Text>
				</View>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.intro")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section1Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section1Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section2Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section2Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section3Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section3Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section5Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section5Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section6Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section6Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section7Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section7Text")}</Text>
				<Text style={[styles.title, { color: textColor }]}>{t("terms.section8Title")}</Text>
				<Text style={[styles.text, { color: textColor }]}>{t("terms.section8Text")}</Text>
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
