import { renderHook, act, waitFor } from "@testing-library/react-native";
import { CardContext, CardProvider } from "@/providers/CardContext";
import { useContext } from "react";

const mockCards = [
	{ id: 1, name: "Card 1", fileUri: "uri1", storeId: null, cardNumber: null },
	{ id: 2, name: "Card 2", fileUri: "uri2", storeId: null, cardNumber: null },
];

jest.mock("@/services/databaseService", () => ({
	getAllCards: jest.fn(() => Promise.resolve(mockCards)),
	insertOneCard: jest.fn(() => Promise.resolve({ lastInsertRowId: 3, changes: 1 })),
	updateOne: jest.fn(() => Promise.resolve({ changes: 1 })),
	deleteOneCard: jest.fn(() => Promise.resolve({ changes: 1 })),
	deleteAllCards: jest.fn(() => Promise.resolve({ changes: 2 })),
}));

jest.mock("expo-sqlite", () => ({
	addDatabaseChangeListener: jest.fn(() => ({ remove: jest.fn() })),
}));

const renderCardHook = () => {
	return renderHook(() => useContext(CardContext), {
		wrapper: CardProvider,
	});
};

describe("CardProvider", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		const { getAllCards } = require("@/services/databaseService");
		getAllCards.mockResolvedValue(mockCards);
	});

	it("should load cards on mount", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});
	});

	it("should add a card successfully", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let addResult: { success: boolean } | undefined;
		await act(async () => {
			addResult = await result.current.addCard({ name: "New Card", fileUri: "new-uri", storeId: null, cardNumber: null });
		});

		expect(addResult?.success).toBe(true);
	});

	it("should handle add card failure when no lastInsertRowId", async () => {
		const { insertOneCard } = require("@/services/databaseService");
		insertOneCard.mockResolvedValueOnce(null);

		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let addResult: { success: boolean } | undefined;
		await act(async () => {
			addResult = await result.current.addCard({ name: "New Card", fileUri: "new-uri", storeId: null, cardNumber: null });
		});

		expect(addResult?.success).toBe(false);
	});

	it("should update a card successfully", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let updateResult: { success: boolean } | undefined;
		await act(async () => {
			updateResult = await result.current.updateCard({ id: 1, name: "Updated", fileUri: "new-uri", storeId: null, cardNumber: null });
		});

		expect(updateResult?.success).toBe(true);
	});

	it("should handle update card failure when no changes", async () => {
		const { updateOne } = require("@/services/databaseService");
		updateOne.mockResolvedValueOnce({ changes: 0 });

		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let updateResult: { success: boolean } | undefined;
		await act(async () => {
			updateResult = await result.current.updateCard({ id: 999, name: "Updated", fileUri: "new-uri", storeId: null, cardNumber: null });
		});

		expect(updateResult?.success).toBe(false);
	});

	it("should delete a card successfully", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let deleteResult: { success: boolean } | undefined;
		await act(async () => {
			deleteResult = await result.current.deleteCard(1);
		});

		expect(deleteResult?.success).toBe(true);
	});

	it("should handle delete card failure when no changes", async () => {
		const { deleteOneCard } = require("@/services/databaseService");
		deleteOneCard.mockResolvedValueOnce({ changes: 0 });

		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let deleteResult: { success: boolean } | undefined;
		await act(async () => {
			deleteResult = await result.current.deleteCard(999);
		});

		expect(deleteResult?.success).toBe(false);
	});

	it("should clear all cards successfully", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		let clearResult: { success: boolean } | undefined;
		await act(async () => {
			clearResult = await result.current.clearDataCards();
		});

		expect(clearResult?.success).toBe(true);
	});

	it("should handle search and filter cards", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		act(() => {
			result.current.handleSearch("Card 1");
		});

		expect(result.current.searchValue).toBe("Card 1");
	});

	it("should clear search value", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		act(() => {
			result.current.handleSearch("Card 1");
		});

		act(() => {
			result.current.handleClearSearchValue();
		});

		expect(result.current.searchValue).toBeNull();
	});

	it("should filter cards by name case-insensitively", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		act(() => {
			result.current.handleSearch("CARD 1");
		});

		await waitFor(() => {
			expect(result.current.filteredCards.length).toBe(1);
			expect(result.current.filteredCards[0].name).toBe("Card 1");
		});
	});

	it("should reset filtered cards when search is cleared", async () => {
		const { result } = renderCardHook();

		await waitFor(() => {
			expect(result.current.cards.length).toBe(2);
		});

		act(() => {
			result.current.handleClearSearchValue();
		});

		expect(result.current.filteredCards.length).toBe(2);
	});
});
