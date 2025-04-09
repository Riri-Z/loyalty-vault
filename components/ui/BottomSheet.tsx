import { useTranslation } from "react-i18next";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { Pressable, StyleSheet, Text } from "react-native";
import { useColor } from "@/providers/ThemeContext";
import { ActionButton } from "./ActionButton";

type Action = {
	label: string;
	callback: () => void;
};

interface Props {
	actionsItems: Action[];
	handleClose: () => void;
}
export default function BottomSheet({ actionsItems, handleClose }: Props) {
	const { t } = useTranslation();
	const translateY = useSharedValue(0);
	const { textColor, isDarkModeOn, cardColor } = useColor();
	// Drag event
	const drag = Gesture.Pan()
		.onChange((event) => {
			const nextY = translateY.value + event.changeY;

			if (nextY >= 0) {
				translateY.value = nextY;
			}
		})
		.onEnd(() => {
			if (translateY.value > 125) {
				runOnJS(handleClose)();
			} else {
				translateY.value = withSpring(0);
			}
		});

	const containerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: translateY.value,
				},
			],
		};
	});

	const bgStyle = isDarkModeOn ? cardColor : "#F9F9F9";
	return (
		<GestureDetector gesture={drag}>
			<Animated.View style={[containerStyle, styles.container, { backgroundColor: bgStyle }]}>
				<Pressable style={styles.dragButton} />
				<Text style={[styles.title, { color: textColor }]}>{t("cards.cta.title")}</Text>
				{actionsItems.length > 0 &&
					actionsItems.map((e) => {
						return <ActionButton key={`${e.label}`} onPress={e.callback} label={e.label} />;
					})}

				<Pressable>
					<Text style={styles.cancel} onPress={handleClose}>
						{t("cards.cta.cancel")}
					</Text>
				</Pressable>
			</Animated.View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		gap: 20,
		display: "flex",
		alignItems: "center",
		padding: 20,
		zIndex: 1,
	},
	dragButton: {
		backgroundColor: "#C4A484",
		width: 40,
		height: 4,
		marginBottom: 10,
		borderRadius: 29999,
	},
	title: { color: "#333333", fontWeight: "bold", fontSize: 16 },
	cancel: { fontWeight: "bold", textDecorationLine: "underline", color: "#BDBDBD" },
});
