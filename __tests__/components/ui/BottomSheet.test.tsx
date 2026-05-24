import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { BottomSheet } from "@/components/ui/BottomSheet";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ textColor: "#000000", isDarkModeOn: false, cardColor: "#ffffff" }),
}));

describe("BottomSheet", () => {
	const mockActions = [
		{ label: "Action 1", callback: jest.fn() },
		{ label: "Action 2", callback: jest.fn() },
	];
	const mockHandleClose = jest.fn();

	it("should render action buttons", () => {
		const { getByText } = render(
			<BottomSheet actionsItems={mockActions} handleClose={mockHandleClose} />,
		);

		expect(getByText("Action 1")).toBeTruthy();
		expect(getByText("Action 2")).toBeTruthy();
	});

	it("should render cancel text", () => {
		const { getByText } = render(
			<BottomSheet actionsItems={mockActions} handleClose={mockHandleClose} />,
		);

		expect(getByText("cards.cta.cancel")).toBeTruthy();
	});

	it("should render title", () => {
		const { getByText } = render(
			<BottomSheet actionsItems={mockActions} handleClose={mockHandleClose} />,
		);

		expect(getByText("cards.cta.title")).toBeTruthy();
	});

	it("should call action callback when button is pressed", () => {
		const { getByText } = render(
			<BottomSheet actionsItems={mockActions} handleClose={mockHandleClose} />,
		);

		fireEvent.press(getByText("Action 1"));

		expect(mockActions[0].callback).toHaveBeenCalled();
	});

	it("should not render actions when actionsItems is empty", () => {
		const { queryByText } = render(
			<BottomSheet actionsItems={[]} handleClose={mockHandleClose} />,
		);

		expect(queryByText("Action 1")).toBeNull();
	});
});
