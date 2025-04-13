import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type Props = {
	isExpanded: { value: boolean };
	children: ReactNode;
	viewKey: string;
	style?: object;
	duration?: number;
};

export function AccordionItem({ isExpanded, children, viewKey, style, duration = 500 }: Props) {
	const height = useSharedValue(560);

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded.value), {
			duration,
		}),
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<Animated.View key={`accordionItem_${viewKey}`} style={[styles.animatedView, bodyStyle, style]}>
			<View
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height;
				}}
				style={styles.wrapper}>
				{children}
			</View>
		</Animated.View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingTop: 24,
	},
	wrapper: {
		width: "100%",
		position: "absolute",
		display: "flex",
		alignItems: "center",
	},
	animatedView: {
		width: "100%",
		overflow: "hidden",
	},
});
