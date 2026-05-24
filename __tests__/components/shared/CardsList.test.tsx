import { render } from "@testing-library/react-native";
import { CardsList } from "@/components/shared/CardsList";
import { Card } from "@/types/Card";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ textColor: "#000000" }),
}));

const mockCards: Card[] = [
	{ id: 1, name: "Card 1", fileUri: "uri1", storeId: null, cardNumber: null },
	{ id: 2, name: "Card 2", fileUri: "uri2", storeId: null, cardNumber: null },
];

describe("CardsList", () => {
	it("should render the result count", () => {
		const { getByText } = render(<CardsList cards={mockCards} />);

		expect(getByText("2 cards.searchInput.result")).toBeTruthy();
	});

	it("should render zero count when no cards", () => {
		const { getByText } = render(<CardsList cards={[]} />);

		expect(getByText("0 cards.searchInput.result")).toBeTruthy();
	});
});
