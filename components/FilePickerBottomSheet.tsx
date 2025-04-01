import { useTranslation } from "react-i18next";
import { ActionButton } from "./ui/ActionButton";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { Pressable, Text } from "react-native";

type Props = {
	handleOpenCamera: () => void;
	handleClose: () => void;
	pickFile: () => void;
};
export default function FilePickerBottomSheet({ handleOpenCamera, pickFile, handleClose }: Props) {
	const { t } = useTranslation();
	const translateY = useSharedValue(0);

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

	return (
		<GestureDetector gesture={drag}>
			<Animated.View
				style={[
					containerStyle,
					{
						position: "absolute",
						bottom: 0,
						width: "100%",

						borderTopLeftRadius: 25,
						borderTopRightRadius: 25,
						gap: 20,
						backgroundColor: "#545649",
						display: "flex",
						alignItems: "center",
						padding: 20,
						zIndex: 1,
					},
				]}>
				<Pressable
					style={{
						backgroundColor: "#C4A484",
						width: 40,
						height: 4,
						marginBottom: 10,
						borderRadius: 29999,
					}}
				/>
				<Text style={{ color: "Black", fontWeight: "bold", fontSize: 16 }}>
					Selectionner une option
				</Text>

				<ActionButton onPress={handleOpenCamera} label={t("cards.cta.openCamera")} />
				<ActionButton onPress={pickFile} label={t("cards.cta.selectFile")} />

				<Pressable>
					<Text
						style={{ fontWeight: "bold", textDecorationLine: "underline" }}
						onPress={handleClose}>
						Annuler
					</Text>
				</Pressable>
			</Animated.View>
		</GestureDetector>
	);
}
