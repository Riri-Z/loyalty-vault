import { render, fireEvent } from "@testing-library/react-native";
import { SearchCard } from "@/components/shared/SearchCard";
import { CardContext } from "@/providers/CardContext";

const mockContextValue = {
	cards: [],
	filteredCards: [],
	loading: false,
	addCard: jest.fn(),
	deleteCard: jest.fn(),
	updateCard: jest.fn(),
	clearDataCards: jest.fn(),
	searchValue: null,
	handleClearSearchValue: jest.fn(),
	handleSearch: jest.fn(),
};

describe("SearchCard", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the search input", () => {
		const { getByPlaceholderText } = render(
			<CardContext.Provider value={mockContextValue}>
				<SearchCard />
			</CardContext.Provider>,
		);

		expect(getByPlaceholderText("cards.searchInput.placeHolderName")).toBeTruthy();
	});

	it("should call handleSearch when text changes", () => {
		const { getByPlaceholderText } = render(
			<CardContext.Provider value={mockContextValue}>
				<SearchCard />
			</CardContext.Provider>,
		);

		const textInput = getByPlaceholderText("cards.searchInput.placeHolderName");
		fireEvent.changeText(textInput, "test search");

		expect(mockContextValue.handleSearch).toHaveBeenCalledWith("test search");
	});

	it("should call handleClearSearchValue when clear button is pressed", () => {
		const { UNSAFE_getByProps } = render(
			<CardContext.Provider
				value={{ ...mockContextValue, searchValue: "test" }}
			>
				<SearchCard />
			</CardContext.Provider>,
		);

		const clearButton = UNSAFE_getByProps({ name: "circle-with-cross" });
		fireEvent.press(clearButton);

		expect(mockContextValue.handleClearSearchValue).toHaveBeenCalled();
	});
});
