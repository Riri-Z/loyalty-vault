import { CameraView } from "expo-camera";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
	updateUri: (fileUri: string) => void;
	closeCamera: () => void;
};

export default function RenderCamera({ updateUri, closeCamera }: Props) {
	const { t } = useTranslation();

	const ref = useRef<CameraView>(null);

	const takePicture = async () => {
		const photo = await ref.current?.takePictureAsync();

		if (photo?.uri) {
			updateUri(photo?.uri);
		} else {
			Toast.show({
				type: "error",
				text1: t("cards.alert.errorCamera"),
			});
		}
		closeCamera();
	};

	return (
		<CameraView
			style={styles.camera}
			ref={ref}
			mode="picture"
			facing="back"
			mute={false}
			responsiveOrientationWhenOrientationLocked>
			<View style={styles.shutterContainer}>
				<Pressable onPress={takePicture}>
					{({ pressed }) => (
						<View
							style={[
								styles.shutterBtn,
								{
									opacity: pressed ? 0.5 : 1,
								},
							]}>
							<View
								style={[
									styles.shutterBtnInner,
									{
										backgroundColor: "white",
									},
								]}
							/>
						</View>
					)}
				</Pressable>
			</View>
		</CameraView>
	);
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
		width: "100%",
	},
	shutterContainer: {
		position: "absolute",
		bottom: 44,
		justifyContent: "center",
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
	},
	shutterBtn: {
		backgroundColor: "transparent",
		borderWidth: 5,
		borderColor: "white",
		width: 85,
		height: 85,
		borderRadius: 45,
		alignItems: "center",
		justifyContent: "center",
	},
	shutterBtnInner: {
		width: 70,
		height: 70,
		borderRadius: 50,
	},
});
