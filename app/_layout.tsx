import { Stack } from "expo-router";
import "@/i18n"; // This line imports the i18n configuration
import { useEffect } from "react";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardsProvider } from "@/providers/cardsContext";
import "@/global.css";
import { colorScheme, useColorScheme } from "nativewind";

export interface Card {
	id: number;
	name: string;
	uri: string;
}
export type Theme = "light" | "dark" | "system";
export default function RootLayout() {
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
							gestureEnabled: false, // Disable swipe gestures for tab screens
						}}
					/>
					<Stack.Screen name="modal" options={{ presentation: "modal" }} />

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
	const fakeCardExist = await db.getFirstAsync("SELECT * FROM cards");
	if (!fakeCardExist) {
		await db.execAsync("INSERT INTO cards (name, uri) VALUES ('testCard', 'fakeURI') ");
	}
}
