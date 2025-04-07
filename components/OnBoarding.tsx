import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useColor } from "@/providers/ThemeProvider";

const screenWidth = Dimensions.get("window").width;

type Props = {
	id: number;
	title: string;
	text: string;
	icon: string;
};
export default function Onboarding({ id, title, text, icon }: Props) {
	const { bgColor } = useColor();

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<Text style={styles.title}>{title}</Text>
			<Image style={styles.image} contentFit="contain" source={icon} alt="credit card" />
			<Text style={styles.text}>{text}</Text>
			<View style={{ flexDirection: "row", marginVertical: 20 }}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		gap: 10,
		alignItems: "center",
		width: screenWidth,
	},
	image: {
		width: 150,
		height: 300,
	},
	title: { fontSize: 24 },
	text: {
		width: screenWidth * 0.9,
		textAlign: "center",
		fontSize: 16,
		includeFontPadding: false,
		lineHeight: 22, // <- optionnel pour meilleur rendu
	},
});
