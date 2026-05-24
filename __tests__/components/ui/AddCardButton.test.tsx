import { render } from "@testing-library/react-native";
import { AddCardButton } from "@/components/ui/AddCardButton";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ secondaryColor: "#4CAF50" }),
}));

jest.mock("expo-router", () => ({
	router: { push: jest.fn() },
}));

describe("AddCardButton", () => {
	it("should render the button container", () => {
		const { UNSAFE_getByType } = render(<AddCardButton />);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});
});
