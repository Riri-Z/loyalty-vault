import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
	imgSource: string;
};

export default function ImageViewer({ imgSource }: Props) {
	return <Image source={imgSource} style={styles.image} contentFit="contain" />;
}

const styles = StyleSheet.create({
	image: {
		height: "100%",
		margin: "auto",
		width: "100%",
	},
});
