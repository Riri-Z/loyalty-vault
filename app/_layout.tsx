import { Stack } from "expo-router";
import "@/i18n"; // This line imports the i18n configuration
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Appearance } from "react-native";
import { useEffect, useState } from "react";

export default function RootLayout() {
	const [themeType, setThemeType] = useState("light");

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			if (colorScheme) {
				setThemeType(colorScheme);
			}
		});

		return () => subscription.remove();
	}, []);

	const theme = themeType === "dark" ? DarkTheme : DefaultTheme;
	return (
		<ThemeProvider value={theme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="modal" options={{ presentation: "modal" }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</ThemeProvider>
	);
}
