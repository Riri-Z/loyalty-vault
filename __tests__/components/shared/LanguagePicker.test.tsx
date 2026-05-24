import { render, fireEvent } from "@testing-library/react-native";
import { LanguagePicker } from "@/components/shared/LanguagePicker";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ textColor: "#000000" }),
}));

describe("LanguagePicker", () => {
	it("should render the language label", () => {
		const { getByText } = render(<LanguagePicker newLanguage="en" />);

		expect(getByText("settings.language")).toBeTruthy();
	});

	it("should display the current language value", () => {
		const { getByText } = render(<LanguagePicker newLanguage="en" />);

		expect(getByText("key_language.en")).toBeTruthy();
	});

	it("should display French language value when newLanguage is fr", () => {
		const { getByText } = render(<LanguagePicker newLanguage="fr" />);

		expect(getByText("key_language.fr")).toBeTruthy();
	});
});
