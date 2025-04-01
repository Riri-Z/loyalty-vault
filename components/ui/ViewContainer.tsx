import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import useColor from "@/hooks/useColor";

export default function ViewContainer({ children }: PropsWithChildren) {
	const { bgColor } = useColor();

	return <View style={[styles.conainer, { backgroundColor: bgColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
	conainer: {
		flex: 1,
		padding: 20,
		gap: 10,
	},
});
