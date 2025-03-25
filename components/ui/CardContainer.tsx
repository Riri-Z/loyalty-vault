import { ReactNode } from "react";
import { View } from "react-native";
import useColor from "@/hooks/useColor";

type Props = { children: ReactNode };

export default function CardContainer({ children }: Props) {
	const { cardColor } = useColor();

	return (
		<View
			style={{
				paddingVertical: 30,
				paddingHorizontal: 20,
				marginBottom: 10,
				backgroundColor: cardColor,
				borderRadius: 20,
			}}>
			{children}
		</View>
	);
}
