import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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
import { addDatabaseChangeListener } from "expo-sqlite";
import { useTranslation } from "react-i18next";

type CardContextType = {
	cards: Card[];
	loading: boolean;
	addCard: (card: AddCard) => Promise<{
		success: boolean;
	}>;
	deleteCard: (id: number) => Promise<{
		success: boolean;
	}>;
	updateCard: ({ id, name, fileUri }: UpdateCard) => Promise<{
		success: boolean;
	}>;
	clearDataCards: () => Promise<{
		success: boolean;
	}>;
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

	const addCard = useCallback(async (card: AddCard) => {
		try {
			const res = await insertOneCard({ ...card });
			if (res?.lastInsertRowId) {
				setCards((prev) => {
					const newCard: Card = { id: res.lastInsertRowId, ...card };
					const cards = [...prev, newCard];
					return cards;
				});
				return { success: true };
			}
			return { success: false };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}, []);

	const updateCard = useCallback(async ({ id, name, fileUri }: Card) => {
		try {
			// Update bdd
			const res = await updateOne({ id, name, fileUri });
			if (res?.changes !== 0) {
				setCards((prev) => {
					const currentCards = [...prev];
					const index = currentCards.findIndex((e) => e.id === id);

					if (index !== -1) {
						const newCard = { id, name, fileUri };
						currentCards[index] = newCard;
					}
					return currentCards;
				});

				return { success: true };
			} else {
				return { success: false };
			}
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}, []);

	const deleteCard = useCallback(async (id: number) => {
		try {
			setLoading(true);
			const res = await deleteOneCard(id);
			if (res.changes !== 0) {
				setCards((prev) => {
					const newCards = prev.filter((card) => card.id === id);
					return newCards;
				});
				return { success: true };
			} else {
				return { success: false };
			}
		} catch (error) {
			console.error(error);
			return { success: false };
		} finally {
			setLoading(false);
		}
	}, []);

	const clearDataCards = useCallback(async () => {
		try {
			const res = await deleteAllCards();
			if (res) {
				setCards([]);
				// Toast.success(t("cards.deleteAlert.success"));
				return { success: true };
			}
			return { success: false };
		} catch (error) {
			console.error(error);
			return { success: false };
			// Toast.error(t("cards.deleteAlert.failed"));
		}
	}, []);

	const value = useMemo(() => {
		return { cards, addCard, deleteCard, clearDataCards, updateCard, loading };
	}, [cards, addCard, deleteCard, clearDataCards, updateCard, loading]);

	return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export { CardContext, CardProvider };
