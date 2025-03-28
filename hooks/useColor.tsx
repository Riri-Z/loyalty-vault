import { useColorScheme } from "react-native";
import { useMemo } from "react";

export default function useColor() {
	const colorScheme = useColorScheme();

	return useMemo(
		() => ({
			textColor: colorScheme === "light" ? "#181818" : "#F2F3F4",
			secondaryColor: colorScheme === "light" ? "#FF6B00" : "#FFA447",
			danger: "#D32F2F",
			bgColor: colorScheme === "light" ? "#F5F5F5" : "#181818",
			cardColor: colorScheme === "light" ? "#ffffff" : "#3b3939",
			isDarkMode: colorScheme !== "light",
			tabIconColor: colorScheme === "light" ? "black" : "white",
			tabBgcolor: colorScheme === "light" ? "white" : "black",
		}),
		[colorScheme],
	);
}
