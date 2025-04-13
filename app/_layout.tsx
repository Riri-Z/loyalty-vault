import { Stack } from "expo-router";
import "@/i18n"; // This line imports the i18n configuration
import { SQLiteProvider } from "expo-sqlite";
import { CardProvider } from "@/providers/CardContext";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { Appearance, useColorScheme } from "react-native";
import { createDb } from "@/providers/useDatabase";
import { useTranslation } from "react-i18next";
import { ThemeProvider, useColor } from "@/providers/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetProvider } from "@/providers/BottomSheetContext";
import ToastManager from "toastify-react-native";
import { toastConfig } from "@/components/ui/CustomToast";

export interface Card {
	id: number;
	name: string;
	fileUri: string;
}
export type Theme = "light" | "dark" | "system";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const { textColor, bgColor } = useColor();
	const { t } = useTranslation();

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colorScheme === "light" ? "#f3f4f6" : "#000000");
	}, [colorScheme]);

	useEffect(() => {
		const getThemeStorage = async () => {
			try {
				const themeStore = await AsyncStorage.getItem("theme");
				if (themeStore === "dark") {
					Appearance.setColorScheme("dark");
				} else {
					Appearance.setColorScheme("light");
				}
			} catch (err) {
				console.error(err);
			}
		};
		getThemeStorage();
	}, []);

	return (
		<ThemeProvider>
			<SQLiteProvider databaseName="db" onInit={createDb}>
				<CardProvider>
					{/* Allow bottomSheet to be in front of tabs */}
					<BottomSheetProvider>
						<Stack
							screenOptions={{
								headerShown: false, // Hide headers for all screens by default
							}}>
							<Stack.Screen
								name="(tabs)"
								options={{
									headerShown: false,
									gestureEnabled: true, // Disable swipe gestures for tab screens
								}}
							/>
							<Stack.Screen
								name="addCardModal"
								options={{
									presentation: "modal",
									headerStyle: {
										backgroundColor: bgColor,
									},
								}}
							/>
							<Stack.Screen
								name="CGU"
								options={{
									title: t("terms.title"),
									headerShown: true,
									headerStyle: {
										backgroundColor: bgColor,
									},
									headerTitleStyle: {
										color: textColor,
										fontSize: 24,
									},
									headerTintColor: textColor,
									headerBackButtonDisplayMode: "generic",
									gestureEnabled: true,
								}}
							/>
							<Stack.Screen
								name="PrivacyPolicy"
								options={{
									title: t("privacyPolicy.title"),
									headerShown: true,
									headerStyle: {
										backgroundColor: bgColor,
									},
									headerTitleStyle: {
										color: textColor,
										fontSize: 24,
									},
									headerTintColor: textColor,
									headerBackButtonDisplayMode: "generic",
									gestureEnabled: true,
								}}
							/>
							<Stack.Screen
								name="OnBoardingScreen"
								options={{
									title: "OnBoardingScreen",
									headerShown: false,
									headerStyle: {
										backgroundColor: bgColor,
									},
									headerTitleStyle: {
										color: textColor,
										fontSize: 24,
									},
									headerTintColor: textColor,
									headerBackButtonDisplayMode: "generic",
									gestureEnabled: true,
								}}
							/>

							<Stack.Screen name="+not-found" />
						</Stack>
						<ToastManager
							config={toastConfig}
							visibilityTime={1000}
							showProgressBar={false}
							showCloseIcon={true}
							position="bottom"
						/>
					</BottomSheetProvider>
				</CardProvider>
			</SQLiteProvider>
		</ThemeProvider>
	);
}
