import { Card } from "@/types/Card";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AddCard, deleteAllCards, deleteOneCard, getAllCards, insertOneCard, UpdateCard, updateOne } from "@/services/databaseService";
import { addDatabaseChangeListener } from "expo-sqlite";
import { useDebounce } from "@/hooks/useDebounce";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { usePostHog } from "posthog-react-native";

type CardContextType = {
	cards: Card[];
	filteredCards: Card[];
	loading: boolean;
	addCard: (card: AddCard) => Promise<{ success: boolean }>;
	deleteCard: (id: number) => Promise<{ success: boolean }>;
	updateCard: (card: UpdateCard) => Promise<{ success: boolean }>;
	clearDataCards: () => Promise<{ success: boolean }>;
	searchValue: string | null;
	handleClearSearchValue: () => void;
	handleSearch: (value: string) => void;
};

export const CardContext = createContext<CardContextType>({} as CardContextType);

type CardProviderProps = {
	children: ReactNode;
};

export const CardProvider = ({ children }: CardProviderProps): JSX.Element => {
	const { t } = useTranslation();
	const posthog = usePostHog();

	const [cards, setCards] = useState<Card[]>([]);
	const [filteredCards, setFilteredCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState<string | null>(null);

	const handleFilterCards = useCallback((filterValue: string | null, cardsToFilter: Card[]): void => {
		if (!filterValue || filterValue.trim().length === 0) {
			setFilteredCards(cardsToFilter);
		} else {
			setFilteredCards(
				cardsToFilter.filter((card) => card.name.toUpperCase().includes(filterValue.toUpperCase())),
			);
		}
	}, []);

	const debouncedOnChange = useDebounce((filter: string) => handleFilterCards(filter, cards), 300);

	const handleSearch = useCallback(
		(val: string) => {
			setSearchValue(val);
			debouncedOnChange(val);
		},
		[debouncedOnChange],
	);

	useEffect(() => {
		const loadCards = async (): Promise<void> => {
			try {
				const allCards = await getAllCards();
				setCards(allCards);
				setFilteredCards(allCards);
			} catch (error) {
				if (error) {
					Toast.show({
						type: "error",
						text1: t("database.errorLoadingCards"),
					});
				}
			}
		};
		loadCards();

		const listener = addDatabaseChangeListener(() => {
			loadCards();
		});

		return () => listener.remove();
	}, [t]);

	useEffect(() => {
		handleFilterCards(searchValue, cards);
	}, [cards, searchValue, handleFilterCards]);

	const handleClearSearchValue = useCallback((): void => {
		setSearchValue(null);
		setFilteredCards(cards);
	}, [cards]);

	const addCard = useCallback(
		async (card: AddCard): Promise<{ success: boolean }> => {
			setLoading(true);
			try {
				const res = await insertOneCard({ ...card });
				if (res?.lastInsertRowId) {
					const newCard: Card = { id: res.lastInsertRowId, ...card };
					setCards((prev) => [...prev, newCard]);
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

	const updateCard = useCallback(
		async ({ id, name, fileUri, storeId, cardNumber }: UpdateCard): Promise<{ success: boolean }> => {
			setLoading(true);
			try {
				const res = await updateOne({ id, name, fileUri, storeId, cardNumber });
				if (res?.changes !== 0) {
					setCards((prev) => {
						const currentCards = [...prev];
						const index = currentCards.findIndex((card) => card.id === id);
						if (index !== -1) {
							currentCards[index] = { id, name, fileUri, storeId, cardNumber };
						}
						return currentCards;
					});
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
		[],
	);

	const deleteCard = useCallback(
		async (id: number): Promise<{ success: boolean }> => {
			setLoading(true);
			try {
				const res = await deleteOneCard(id);
				if (res.changes !== 0) {
					setCards((prev) => prev.filter((card) => card.id !== id));
					posthog.capture("user_deleted_card", { success: true });
					posthog.reset();
					return { success: true };
				}
				posthog.capture("user_deleted_card", { success: false });
				return { success: false };
			} catch (error) {
				console.error(error);
				return { success: false };
			} finally {
				setLoading(false);
			}
		},
		[posthog],
	);

	const clearDataCards = useCallback(async (): Promise<{ success: boolean }> => {
		try {
			const res = await deleteAllCards();
			if (res) {
				setCards([]);
				setFilteredCards([]);
				posthog.capture("user_cleared_app", { success: true });
				return { success: true };
			}
			return { success: false };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}, [posthog]);

	const value = useMemo(
		() => ({
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
		}),
		[addCard, cards, filteredCards, deleteCard, clearDataCards, updateCard, handleSearch, searchValue, handleClearSearchValue, loading],
	);

	return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
