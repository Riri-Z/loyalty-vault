import React from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, StatusBar } from "react-native";
import { useColor } from "@/providers/ThemeContext";

const loader = require("../../assets/lottie/loader.json");

export default function Loading() {
	const { bgColor } = useColor();

	return (
		<>
			<StatusBar translucent backgroundColor="transparent" />
			<SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
				<LottieView
					source={loader}
					style={{ width: "50%", height: "100%", alignSelf: "center", backgroundColor: bgColor }}
					autoPlay
					loop
				/>
			</SafeAreaView>
		</>
	);
}
