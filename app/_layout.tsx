import { Stack } from "expo-router";
import "@/i18n"; // This line imports the i18n configuration
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Appearance } from "react-native";
import { useEffect, useState } from "react";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardsProvider } from "@/providers/cardsContext";

export interface Card {
	id: number;
	name: string;
	uri: string;
}
export default function RootLayout() {
	const [themeType, setThemeType] = useState("light");

	useEffect(() => {
		async function getThemeFromAsyncStorage() {
			const theme = await AsyncStorage.getItem("theme");
			if (theme) setThemeType(theme);
		}
		getThemeFromAsyncStorage();
	}, []);

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
			<CardsProvider>
				<SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
					<Stack
						screenOptions={{
							headerShown: false, // Hide headers for all screens by default
						}}>
						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
								gestureEnabled: false, // Disable swipe gestures for tab screens
							}}
						/>
						<Stack.Screen name="modal" options={{ presentation: "modal" }} />

						<Stack.Screen name="+not-found" />
					</Stack>
				</SQLiteProvider>
			</CardsProvider>
		</ThemeProvider>
	);
}

async function createDbIfNeeded(db: SQLiteDatabase) {
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS cards (id  INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uri TEXT)`,
	);
	const fakeCardExist = await db.getFirstAsync("SELECT * FROM cards");
	if (!fakeCardExist) {
		await db.execAsync("INSERT INTO cards (name, uri) VALUES ('testCard', 'fakeURI') ");
	}
}
