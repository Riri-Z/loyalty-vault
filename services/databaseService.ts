import { Card } from "@/types/Card";
import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseAsync("db", { enableChangeListener: true });

export type AddCard = {
	name: string;
	fileUri: string;
};

export type UpdateCard = {
	id: number;
	name: string;
	fileUri: string;
};

export const createDb = async (database: SQLiteDatabase): Promise<void> => {
	await database.execAsync(
		`CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fileUri TEXT)`,
	);
};

export const insertOneCard = async ({ name, fileUri }: AddCard): Promise<SQLite.SQLiteRunResult | undefined> => {
	try {
		return (await db).runAsync("INSERT INTO cards (name, fileUri) VALUES (?,?)", name, fileUri);
	} catch (error) {
		console.error("Failed insert new card, error:", error);
	}
};

export const updateOne = async ({ id, name, fileUri }: UpdateCard): Promise<SQLite.SQLiteRunResult | undefined> => {
	try {
		return (await db).runAsync(`UPDATE cards SET name = ?, fileUri = ? WHERE id = ?`, [name, fileUri, id]);
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
