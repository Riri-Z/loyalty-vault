import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useColor } from "@/providers/ThemeContext";
import { t } from "i18next";
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
	title: string;
	text: string;
	icon: string;
	isLottie: boolean;
};

export default function Onboarding({ title, text, icon, isLottie }: Props) {
	const { bgColor, textColor } = useColor();

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<Text style={[styles.title, { color: textColor }]}>{t(title)}</Text>
			{isLottie ? (
				<LottieView source={icon} style={styles.image} autoPlay loop />
			) : (
				<Image style={styles.image} contentFit="contain" source={icon} alt="credit card" />
			)}
			<Text style={[styles.text, { color: textColor }]}>{t(text)}</Text>
			<View style={{ flexDirection: "row", marginVertical: 20 }}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: screenWidth,
	},
	image: {
		width: 150,
		height: 300,
	},
	title: { fontSize: 24, fontWeight: "bold" },
	text: {
		width: screenWidth * 0.9,
		textAlign: "center",
		fontSize: 20,
		includeFontPadding: false,
		lineHeight: 24,
	},
});
