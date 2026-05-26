import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useColor } from "@/providers/ThemeContext";
import { t } from "i18next";
import LottieView from "lottie-react-native";
import type { LottieViewProps } from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
	title: string;
	text: string;
	icon: LottieViewProps["source"];
	isLottie: boolean;
};

export const OnBoarding = ({ title, text, icon, isLottie }: Props): JSX.Element => {
	const { bgColor, textColor } = useColor();

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<Text style={[styles.title, { color: textColor }]}>{t(title)}</Text>
			{isLottie ? (
				<LottieView source={icon} style={styles.image} autoPlay loop />
			) : (
				<Image style={styles.image} contentFit="contain" source={icon as any} />
			)}
			<Text style={[styles.text, { color: textColor }]}>{t(text)}</Text>
		</View>
	);
};

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
