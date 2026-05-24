import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ActionButton } from "@/components/ui/ActionButton";

describe("ActionButton", () => {
	it("should render with the correct label", () => {
		const { getByText } = render(<ActionButton onPress={() => {}} label="Test Action" />);

		expect(getByText("Test Action")).toBeTruthy();
	});

	it("should call onPress when pressed", () => {
		const onPress = jest.fn();
		const { getByText } = render(<ActionButton onPress={onPress} label="Test Action" />);

		fireEvent.press(getByText("Test Action"));

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
