import { render, fireEvent } from "@testing-library/react-native";
import { CardsInformation } from "@/components/shared/CardsInformation";
import { CardContext } from "@/providers/CardContext";

const mockContextValue = {
	cards: [],
	filteredCards: [],
	loading: false,
	addCard: jest.fn(),
	deleteCard: jest.fn(() => Promise.resolve({ success: true })),
	updateCard: jest.fn(),
	clearDataCards: jest.fn(),
	searchValue: null,
	handleClearSearchValue: jest.fn(),
	handleSearch: jest.fn(),
};

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({
		textColor: "#000000",
		secondaryColor: "#4CAF50",
		danger: "#D32F2F",
		cardColor: "#ffffff",
	}),
}));

describe("CardsInformation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render card name", () => {
		const { getAllByText } = render(
			<CardContext.Provider value={mockContextValue}>
				<CardsInformation
					id={1}
					name="Test Card"
					fileUri="test-uri"
					storeId={null}
					cardNumber={null}
					openCardDetail={jest.fn()}
				/>
			</CardContext.Provider>,
		);

		expect(getAllByText("Test Card").length).toBeGreaterThan(0);
	});

	it("should render store name when storeId is set", () => {
		const { getByText } = render(
			<CardContext.Provider value={mockContextValue}>
				<CardsInformation
					id={1}
					name="Test Card"
					fileUri="test-uri"
					storeId={1}
					cardNumber="1234 5678 9012 3456"
					openCardDetail={jest.fn()}
				/>
			</CardContext.Provider>,
		);

		expect(getByText("Carrefour")).toBeTruthy();
	});

	it("should mask card number on display", () => {
		const { getByText } = render(
			<CardContext.Provider value={mockContextValue}>
				<CardsInformation
					id={1}
					name="Test Card"
					fileUri="test-uri"
					storeId={null}
					cardNumber="1234 5678 9012 3456"
					openCardDetail={jest.fn()}
				/>
			</CardContext.Provider>,
		);

		expect(getByText("•••• •••• 9012 3456")).toBeTruthy();
	});

	it("should show fallback icon when no store selected", () => {
		const { getByText } = render(
			<CardContext.Provider value={mockContextValue}>
				<CardsInformation
					id={1}
					name="Test Card"
					fileUri="test-uri"
					storeId={null}
					cardNumber={null}
					openCardDetail={jest.fn()}
				/>
			</CardContext.Provider>,
		);

		expect(getByText("?")).toBeTruthy();
	});
});
