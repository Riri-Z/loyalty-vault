import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import useColor from "@/hooks/useColor";

type Props = { children: ReactNode };

export default function CardContainer({ children }: Props) {
	const { cardColor } = useColor();

	return <View style={[styles.container, { backgroundColor: cardColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		gap: 10,
		marginBottom: 10,
		borderRadius: 20,
	},
});
