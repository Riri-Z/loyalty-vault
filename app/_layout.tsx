import { Stack } from "expo-router";
import "@/i18n"; // This line imports the i18n configuration
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { CardsProvider } from "@/providers/CardsContext";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { useColorScheme } from "react-native";

export interface Card {
	id: number;
	name: string;
	uri: string;
}
export type Theme = "light" | "dark" | "system";
export default function RootLayout() {
	const colorScheme = useColorScheme();
	console.log("colorScheme", colorScheme);
	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colorScheme === "light" ? "#f3f4f6" : "#000000");
	}, [colorScheme]);

	return (
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
							gestureEnabled: true, // Disable swipe gestures for tab screens
						}}
					/>
					<Stack.Screen
						name="modal"
						options={{
							presentation: "modal",
						}}
					/>

					<Stack.Screen name="+not-found" />
				</Stack>
			</SQLiteProvider>
		</CardsProvider>
	);
}

async function createDbIfNeeded(db: SQLiteDatabase) {
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS cards (id  INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, uri TEXT)`,
	);
}
