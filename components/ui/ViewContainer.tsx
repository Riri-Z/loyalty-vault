import { PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useColor } from "@/providers/ThemeProvider";

export default function ViewContainer({ children }: PropsWithChildren) {
	const { bgColor } = useColor();

	return (
		<>
			<StatusBar translucent backgroundColor="transparent" />
			<View style={[styles.container, { backgroundColor: bgColor }]}>{children}</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 10,
		zIndex: 1,
	},
});
