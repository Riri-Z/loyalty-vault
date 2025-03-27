import useColor from "@/hooks/useColor";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { useEffect } from "react";

const Ring = ({ delay }: any) => {
	const { textColor, cardColor, isDarkMode, bgColor } = useColor();

	const ring = useSharedValue(0);
	useEffect(() => {
		ring.value = withDelay(
			delay,
			withRepeat(
				withTiming(1, {
					duration: 4000,
				}),
				-1,
			),
		);
	}, []);
	const animatedRing = useAnimatedStyle(() => {
		return {
			opacity: 0.8 - ring.value,
			transform: [
				{
					scale: interpolate(ring.value, [0, 1], [0, 4]),
				},
			],
		};
	});
	return (
		<Animated.View
			style={[styles.ring, { backgroundColor: isDarkMode ? "#4CAF50" : "#7ab000" }, animatedRing]}
		/>
	);
};

export default function AddCardButton() {
	const { textColor, cardColor, isDarkMode, bgColor } = useColor();

	return (
		<View style={styles.container}>
			<Ring delay={0} />
			<Ring delay={1000} />
			<Ring delay={2000} />

			{/* 	<TouchableOpacity
				onPress={() => router.push("/modal")}
				style={[styles.addbutton, { backgroundColor: isDarkMode ? "#4CAF50" : "#7ab000" }]}>
				<Entypo name="plus" size={55} color={textColor} />
			</TouchableOpacity> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// position: "absolute",
		// right: 5,
		// bottom: 0,
		// zIndex: 1,
	},
	ring: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 70,
		height: 70,
		borderRadius: 50,
		borderWidth: 10,
		borderColor: "tomato",
	},
	addbutton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		// position: "absolute",
		// right: 20,
		alignItems: "center",
		justifyContent: "center",
		// bottom: 20,
		// zIndex: 1,
		elevation: 1,
	},
});
