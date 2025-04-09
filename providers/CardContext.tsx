import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
	AddCard,
	Card,
	deleteAllCards,
	deleteOneCard,
	getAllCards,
	insertOneCard,
	UpdateCard,
	updateOne,
} from "./useDatabase";
import { addDatabaseChangeListener, SQLiteRunResult } from "expo-sqlite";
import { useTranslation } from "react-i18next";
import { Toast } from "toastify-react-native";

type CardContextType = {
	cards: Card[];
	loading: boolean;
	addCard: (card: AddCard) => void;
	deleteCard: (id: number) => void;
	updateCard: ({ id, name, fileUri }: UpdateCard) => Promise<SQLiteRunResult | undefined>;
	clearDataCards: () => Promise<void>;
};
const CardContext = createContext<CardContextType>({} as CardContextType);

const CardProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation();
	const [cards, setCards] = useState<Card[]>([] as Card[]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//  Allow to load displayed cards
		async function loadCards() {
			const cards = await getAllCards();
			setCards(cards);
		}
		loadCards();

		const listener = addDatabaseChangeListener(() => {
			loadCards(); // Reload cards
		});

		return () => listener.remove();
	}, []);

	const addCard = async (card: AddCard) => {
		try {
			const res = await insertOneCard({ ...card });
			if (res?.lastInsertRowId) {
				Toast.success(t("cards.addCardAlert.success"));
				const newCard: Card = { id: res.lastInsertRowId, ...card };
				const newCards = [...cards, newCard];
				setCards(newCards);
			}
		} catch (error) {
			console.error(error);
		}
	};

	async function updateCard({ id, name, fileUri }: Card) {
		try {
			const res = await updateOne({ id, name, fileUri });
			const arrCards = cards;
			if (res?.changes) {
				const index = arrCards.findIndex((e) => e.id === id);
				if (index !== -1) {
					const newCard = { id, name, fileUri };
					arrCards[index] = newCard;
					setCards(arrCards);
				}
				Toast.success(t("cards.updateAlert.success"));
			}
			return res;
		} catch (error) {
			console.error(error);
			Toast.error(t("cards.updateAlert.failed"));
		}
	}

	const deleteCard = async (id: number): Promise<void> => {
		try {
			setLoading(true);
			const res = await deleteOneCard(id);
			if (res.changes) {
				const newCards = cards.filter((card) => card.id === id);
				setCards(newCards);
				Toast.success(t("cards.clearApp.success"));
			} else {
				Toast.error("cards.clearApp.failed");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const clearDataCards = async () => {
		try {
			const res = await deleteAllCards();
			if (res) {
				setCards([]);
				Toast.success(t("cards.deleteAlert.success"));
			}
		} catch (error) {
			console.error(error);
			Toast.error(t("cards.deleteAlert.failed"));
		}
	};
	const value = useMemo(() => {
		return { cards, addCard, deleteCard, clearDataCards, updateCard, loading };
	}, [cards]);

	return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export { CardContext, CardProvider };
