import { useColorScheme } from "react-native";
import { useMemo } from "react";

export default function useColor() {
	const colorScheme = useColorScheme();

	return useMemo(
		() => ({
			textColor: colorScheme === "light" ? "#181818" : "#F2F3F4",
			bgColor: colorScheme === "light" ? "#F5F5F5" : "#181818",
			cardColor: colorScheme === "light" ? "#ffffff" : "#3b3939",
			tabIconColor: colorScheme === "light" ? "blue" : "white",
			isDarkMode: colorScheme !== "light",
		}),
		[colorScheme],
	);
}
