import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";

type Props = PropsWithChildren;

export const ViewContainer = ({ children }: Props): JSX.Element => {
	const { bgColor, isDarkModeOn } = useColor();

	return (
		<>
			<StatusBar style={isDarkModeOn ? "light" : "dark"} />
			<View style={[styles.container, { backgroundColor: bgColor }]}>{children}</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 10,
		zIndex: 1,
	},
});
