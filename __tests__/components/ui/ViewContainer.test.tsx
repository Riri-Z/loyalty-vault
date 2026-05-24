import React from "react";
import { render } from "@testing-library/react-native";
import { ViewContainer } from "@/components/ui/ViewContainer";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ bgColor: "#ffffff", isDarkModeOn: false }),
}));

describe("ViewContainer", () => {
	it("should render with empty children", () => {
		const { UNSAFE_getByType } = render(<ViewContainer />);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});

	it("should render with children", () => {
		const { UNSAFE_getByType } = render(
			<ViewContainer>
				<React.Fragment />
			</ViewContainer>,
		);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});
});
