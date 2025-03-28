import { Card } from "@/types/Card";
import * as SQLite from "expo-sqlite";

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

const insertOneCard = async ({ name, fileUri }: AddCard) => {
	try {
		return (await db).runAsync("INSERT INTO cards (name, uri) VALUES (?,?)", name, fileUri);
	} catch (error) {
		console.error("Failed insert new card ,errror : ", error);
	}
};

const updateOne = async ({ id, name, fileUri }: UpdateCard) => {
	try {
		return (await db).runAsync(`UPDATE cards  SET name = ?, uri=?  WHERE id =?`, [
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
		(await db).runAsync("DELETE FROM cards where id=?", [id]);
	} catch (error) {
		console.error("Failed deleting card, error : ", error);
		throw error;
	}
}

async function deleteAllCards() {
	try {
		return (await db).runAsync("Delete from cards");
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
export { insertOneCard, deleteAllCards, deleteOneCard, getAllCards, updateOne, AddCard, Card };
