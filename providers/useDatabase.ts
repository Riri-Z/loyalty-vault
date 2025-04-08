import { Card } from "@/types/Card";
import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseAsync("test.db", { enableChangeListener: true });

type AddCard = {
	name: string;
	fileUri: string;
};
type UpdateCard = {
	id: number;
	name: string;
	fileUri: string;
};

async function createDb(db: SQLiteDatabase) {
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS cards (id  INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, fileUri TEXT)`,
	);
}

const insertOneCard = async ({ name, fileUri }: AddCard) => {
	try {
		return (await db).runAsync("INSERT INTO cards (name, fileUri) VALUES (?,?)", name, fileUri);
	} catch (error) {
		console.error("Failed insert new card ,errror : ", error);
	}
};

const updateOne = async ({ id, name, fileUri }: UpdateCard) => {
	try {
		return (await db).runAsync(`UPDATE cards  SET name = ?, fileUri=?  WHERE id =?`, [
			name,
			fileUri,
			id,
		]);
	} catch (error) {
		console.error("Failed updating the card", error);
	}
};

async function deleteOneCard(id: number) {
	try {
		return (await db).runAsync("DELETE FROM cards where id=?", [id]);
	} catch (error) {
		console.error("Failed deleting card, error : ", error);
		throw error;
	}
}

async function deleteAllCards() {
	try {
		const res = (await db).runAsync("Delete from cards");
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getAllCards(): Promise<Card[]> {
	try {
		return (await db).getAllAsync("SELECT * FROM cards");
	} catch (error) {
		console.error(error);
		throw error;
	}
}
export {
	createDb,
	insertOneCard,
	deleteAllCards,
	deleteOneCard,
	getAllCards,
	updateOne,
	AddCard,
	Card,
	UpdateCard,
};
