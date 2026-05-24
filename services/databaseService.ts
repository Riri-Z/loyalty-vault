import { Card } from "@/types/Card";
import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseAsync("db", { enableChangeListener: true });

export type AddCard = {
	name: string;
	fileUri: string;
	storeId: number | null;
	cardNumber: string | null;
};

export type UpdateCard = {
	id: number;
	name: string;
	fileUri: string;
	storeId: number | null;
	cardNumber: string | null;
};

export const createDb = async (database: SQLiteDatabase): Promise<void> => {
	await database.execAsync(
		`CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fileUri TEXT, storeId INTEGER, cardNumber TEXT)`,
	);
	await database.execAsync(`ALTER TABLE cards ADD COLUMN storeId INTEGER`);
	await database.execAsync(`ALTER TABLE cards ADD COLUMN cardNumber TEXT`);
};

export const insertOneCard = async ({ name, fileUri, storeId, cardNumber }: AddCard): Promise<SQLite.SQLiteRunResult | undefined> => {
	try {
		return (await db).runAsync(
			"INSERT INTO cards (name, fileUri, storeId, cardNumber) VALUES (?,?,?,?)",
			[name, fileUri, storeId, cardNumber],
		);
	} catch (error) {
		console.error("Failed insert new card, error:", error);
	}
};

export const updateOne = async ({ id, name, fileUri, storeId, cardNumber }: UpdateCard): Promise<SQLite.SQLiteRunResult | undefined> => {
	try {
		return (await db).runAsync(
			`UPDATE cards SET name = ?, fileUri = ?, storeId = ?, cardNumber = ? WHERE id = ?`,
			[name, fileUri, storeId, cardNumber, id],
		);
	} catch (error) {
		console.error("Failed updating the card", error);
	}
};

export const deleteOneCard = async (id: number): Promise<SQLite.SQLiteRunResult> => {
	try {
		return (await db).runAsync("DELETE FROM cards WHERE id = ?", [id]);
	} catch (error) {
		console.error("Failed deleting card, error:", error);
		throw error;
	}
};

export const deleteAllCards = async (): Promise<SQLite.SQLiteRunResult> => {
	try {
		const res = (await db).runAsync("DELETE FROM cards");
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getAllCards = async (): Promise<Card[]> => {
	try {
		return (await db).getAllAsync<Card>("SELECT * FROM cards");
	} catch (error) {
		console.error(error);
		throw error;
	}
};
