import { render, fireEvent } from "@testing-library/react-native";
import { ThemePicker } from "@/components/shared/ThemePicker";

const mockToggleTheme = jest.fn();

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({
		textColor: "#000000",
		isDarkModeOn: false,
		toggleTheme: mockToggleTheme,
	}),
}));

describe("ThemePicker", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the theme label", () => {
		const { getByText } = render(<ThemePicker />);

		expect(getByText("settings.theme")).toBeTruthy();
	});

	it("should call toggleTheme when switch is toggled", () => {
		const { UNSAFE_getByProps } = render(<ThemePicker />);
		const switchComponent = UNSAFE_getByProps({ value: false });

		fireEvent(switchComponent, "onValueChange", true);

		expect(mockToggleTheme).toHaveBeenCalled();
	});
});
