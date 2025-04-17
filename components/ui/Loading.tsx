import React from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { useColor } from "@/providers/ThemeContext";

const loader = require("../../assets/lottie/loader.json");

export default function Loading() {
	const { bgColor } = useColor();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
			<LottieView
				source={loader}
				style={[styles.image, { backgroundColor: bgColor }]}
				autoPlay
				loop
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	image: {
		width: "50%",
		height: "100%",
		alignSelf: "center",
	},
});
