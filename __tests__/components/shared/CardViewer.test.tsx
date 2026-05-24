import { render } from "@testing-library/react-native";
import { CardViewer } from "@/components/shared/CardViewer";

describe("CardViewer", () => {
	it("should render modal with card name", () => {
		const { getByText } = render(
			<CardViewer isVisible={true} src="test-uri" name="Test Card" onClose={jest.fn()} />,
		);

		expect(getByText("Test Card")).toBeTruthy();
	});

	it("should render close icon", () => {
		const { UNSAFE_getByProps } = render(
			<CardViewer isVisible={true} src="test-uri" name="Test Card" onClose={jest.fn()} />,
		);

		const closeIcon = UNSAFE_getByProps({ name: "close" });
		expect(closeIcon).toBeTruthy();
	});

	it("should render ImageViewer", () => {
		const { UNSAFE_getByType } = render(
			<CardViewer isVisible={true} src="test-uri" name="Test Card" onClose={jest.fn()} />,
		);

		expect(UNSAFE_getByType("Image")).toBeTruthy();
	});
});
