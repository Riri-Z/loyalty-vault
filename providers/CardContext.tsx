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
import { useDebounce } from "@/hooks/useDebounce";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

type CardContextType = {
	cards: Card[];
	filteredCards: Card[];
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
	searchValue: string | null;
	handleClearSearchValue: () => void;
	handleSearch: (value: string) => void;
};

const CardContext = createContext<CardContextType>({} as CardContextType);

const CardProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation();

	const [cards, setCards] = useState<Card[]>([] as Card[]);
	const [filteredCards, setFilteredCards] = useState<Card[]>([] as Card[]);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState<null | string>(null);

	// Update context cards based on debounce searchValue
	const handleFilterCards = useCallback((filterValue: string | null, cardsToFilter: Card[]) => {
		if (!filterValue || filterValue.trim().length === 0) {
			setFilteredCards(cardsToFilter);
		} else {
			setFilteredCards((prev) => {
				return cardsToFilter.filter((card) =>
					card.name.toUpperCase().includes(filterValue.toUpperCase()),
				);
			});
		}
	}, []);

	const debouncedOnChange = useDebounce((filter: string) => handleFilterCards(filter, cards), 3000);

	const handleSearch = useCallback(
		(val: string) => {
			setSearchValue(val);
			debouncedOnChange(val);
		},
		[debouncedOnChange],
	);

	//  Allow to load displayed cards
	useEffect(() => {
		async function loadCards() {
			try {
				const cards = await getAllCards();
				setCards(cards);
				setFilteredCards(cards);
			} catch (error) {
				if (error) {
					Toast.show({
						type: "error",
						text1: t("database.errorLoadingCards"),
					});
				}
			}
		}
		loadCards();

		const listener = addDatabaseChangeListener(() => {
			loadCards(); // Reload cards
		});

		return () => listener.remove();
	}, [t]);

	// Update filterCards when search or cards are modified
	useEffect(() => {
		handleFilterCards(searchValue, cards);
	}, [cards, searchValue, handleFilterCards]);

	// Clear search input, and resetCards
	const handleClearSearchValue = useCallback(async () => {
		setSearchValue(null);
		setFilteredCards(cards);
	}, [cards]);

	const addCard = useCallback(
		async (card: AddCard) => {
			setLoading(true);
			try {
				const res = await insertOneCard({ ...card });
				if (res?.lastInsertRowId) {
					const newCard: Card = { id: res.lastInsertRowId, ...card };
					const newCards: Card[] = [...cards, newCard];
					setCards(newCards);
					return { success: true };
				}
				return { success: false };
			} catch (error) {
				console.error(error);
				return { success: false };
			} finally {
				setLoading(false);
			}
		},
		[cards],
	);

	const updateCard = useCallback(async ({ id, name, fileUri }: Card) => {
		setLoading(true);
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
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteCard = useCallback(async (id: number) => {
		setLoading(true);
		try {
			const res = await deleteOneCard(id);
			if (res.changes !== 0) {
				setCards((prev) => {
					const newCards = prev.filter((card) => card.id !== id);
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
				setFilteredCards([]);
				return { success: true };
			}
			return { success: false };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}, []);

	const value = useMemo(() => {
		return {
			cards,
			filteredCards,
			addCard,
			deleteCard,
			clearDataCards,
			updateCard,
			handleSearch,
			searchValue,
			handleClearSearchValue,
			loading,
		};
	}, [
		addCard,
		cards,
		filteredCards,
		deleteCard,
		clearDataCards,
		updateCard,
		handleSearch,
		searchValue,
		handleClearSearchValue,
		loading,
	]);

	return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export { CardContext, CardProvider };
