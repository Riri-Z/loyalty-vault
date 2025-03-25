import { PropsWithChildren } from "react";
import { View } from "react-native";
import useColor from "@/hooks/useColor";

export default function ViewContainer({ children }: PropsWithChildren) {
	const { bgColor } = useColor();

	return <View style={{ flex: 1, padding: 20, backgroundColor: bgColor }}>{children}</View>;
}
