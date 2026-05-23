import { Stack } from "expo-router";
import "@/i18n";
import { SQLiteProvider } from "expo-sqlite";
import { CardProvider } from "@/providers/CardContext";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { Appearance, useColorScheme } from "react-native";
import { createDb } from "@/services/databaseService";
import { useTranslation } from "react-i18next";
import { ThemeProvider, useColor } from "@/providers/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetProvider } from "@/providers/BottomSheetContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/ui/CustomToast";
import { PostHogProvider } from "posthog-react-native";

export type Theme = "light" | "dark" | "system";

export default function RootLayout(): JSX.Element {
	const colorScheme = useColorScheme();
	const { textColor, bgColor } = useColor();
	const { t } = useTranslation();

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colorScheme === "light" ? "#f3f4f6" : "#000000");
	}, [colorScheme]);

	useEffect(() => {
		const getThemeStorage = async (): Promise<void> => {
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

	const postHogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;

	return (
		<PostHogProvider
			apiKey={postHogApiKey}
			autocapture={true}
			options={{
				host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
			}}>
			<ThemeProvider>
				<SQLiteProvider databaseName="db" onInit={createDb}>
					<CardProvider>
						<BottomSheetProvider>
							<Stack
								screenOptions={{
									headerShown: false,
								}}>
								<Stack.Screen
									name="(tabs)"
									options={{
										headerShown: false,
										gestureEnabled: true,
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
							<Toast config={toastConfig} position="bottom" visibilityTime={4000} autoHide />
						</BottomSheetProvider>
					</CardProvider>
				</SQLiteProvider>
			</ThemeProvider>
		</PostHogProvider>
	);
}
