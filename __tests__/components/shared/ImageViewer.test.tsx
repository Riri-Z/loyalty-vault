import { render } from "@testing-library/react-native";
import { ImageViewer } from "@/components/shared/ImageViewer";

describe("ImageViewer", () => {
	it("should render an Image component", () => {
		const { UNSAFE_getByType } = render(<ImageViewer imgSource="test-uri" />);

		expect(UNSAFE_getByType("Image")).toBeTruthy();
	});
});
