import { Cards } from "@/types/Cards";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("test.db");

type Card = {
	id: number;
	name: string;
	fileUri: string;
};

type AddCard = {
	name: string;
	fileUri: string;
};

const initDB = async () => {};

const insertOneCard = async ({ name, fileUri }: AddCard) => {
	try {
		const res = (await db).runAsync("INSERT INTO cards (name, uri) VALUES (?,?)", name, fileUri);
		console.log(res);
		return res;
	} catch (error) {
		console.error("Failed insert new card ,errror : ", error);
	}
};

async function deleteOneCard(id: number) {
	try {
		const res = (await db).runAsync("DELETE FROM cards where id=?", [id]);
		console.log(res);
	} catch (error) {
		console.error("Failed deleting card, error : ", error);
		throw error;
	}
}

async function deleteAllCards() {
	try {
		const res = (await db).runAsync("Delete from cards");
		console.log(await res);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getAllCards(): Promise<Cards[]> {
	try {
		const res: Promise<Cards[]> = (await db).getAllAsync("SELECT * FROM cards");
		console.log(await res);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
export { insertOneCard, deleteAllCards, deleteOneCard, getAllCards, AddCard, Card };
