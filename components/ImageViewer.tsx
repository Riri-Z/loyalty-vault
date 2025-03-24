import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
	imgSource: string;
};

export default function ImageViewer({ imgSource }: Props) {
	return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
	image: {
		height: 500,
		width: "100%",
	},
});
