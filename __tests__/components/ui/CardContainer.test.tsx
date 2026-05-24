import React from "react";
import { render } from "@testing-library/react-native";
import { CardContainer } from "@/components/ui/CardContainer";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ cardColor: "#ffffff" }),
}));

describe("CardContainer", () => {
	it("should render children with correct styling", () => {
		const { UNSAFE_getByType } = render(
			<CardContainer>
				<React.Fragment />
			</CardContainer>,
		);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});
});
