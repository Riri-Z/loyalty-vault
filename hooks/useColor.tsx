import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";

export default function useColor() {
	const colorScheme = useColorScheme();
	const [color, setColor] = useState("");
	const [bgColor, setBgColor] = useState("");
	const [cardColor, setCardColor] = useState("");
	const [tabIconColor, setTabIconColor] = useState("");

	useEffect(() => {
		setColor(colorScheme === "light" ? "#181818" : "#F2F3F4");
		setBgColor(colorScheme === "light" ? "#F5F5F5" : "#181818");
		setCardColor(colorScheme === "light" ? "#ffffff" : "#3b3939");
		setTabIconColor(colorScheme === "light" ? "blue" : "white");
	}, [colorScheme]);

	return { color, bgColor, cardColor, tabIconColor };
}
