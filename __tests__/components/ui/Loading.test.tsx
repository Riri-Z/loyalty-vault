import React from "react";
import { render } from "@testing-library/react-native";
import { Loading } from "@/components/ui/Loading";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ bgColor: "#ffffff" }),
}));

describe("Loading", () => {
	it("should render the loading component", () => {
		const { UNSAFE_getByType } = render(<Loading />);

		expect(UNSAFE_getByType("LottieView")).toBeTruthy();
	});
});
