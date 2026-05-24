import { renderHook, act } from "@testing-library/react-native";
import { BottomSheetProvider, BottomSheetContext } from "@/providers/BottomSheetContext";
import { useContext } from "react";

const renderBottomSheetHook = () => {
	return renderHook(() => useContext(BottomSheetContext), {
		wrapper: BottomSheetProvider,
	});
};

describe("BottomSheetProvider", () => {
	it("should initialize with default values", () => {
		const { result } = renderBottomSheetHook();

		expect(result.current.isVisible).toBe(false);
		expect(result.current.actions).toEqual([]);
	});

	it("should display bottom sheet when handleDisplayBottomSheet is called with true", () => {
		const { result } = renderBottomSheetHook();

		act(() => {
			result.current.handleDisplayBottomSheet(true);
		});

		expect(result.current.isVisible).toBe(true);
	});

	it("should hide bottom sheet when handleDisplayBottomSheet is called with false", () => {
		const { result } = renderBottomSheetHook();

		act(() => {
			result.current.handleDisplayBottomSheet(true);
		});

		act(() => {
			result.current.handleDisplayBottomSheet(false);
		});

		expect(result.current.isVisible).toBe(false);
	});

	it("should update actions and show sheet when handleUpdateActions is called", () => {
		const { result } = renderBottomSheetHook();
		const mockActions = [
			{ label: "Action 1", callback: jest.fn() },
			{ label: "Action 2", callback: jest.fn() },
		];

		act(() => {
			result.current.handleUpdateActions(mockActions);
		});

		expect(result.current.actions).toEqual(mockActions);
		expect(result.current.isVisible).toBe(true);
	});

	it("should reset actions and hide sheet when handleCloseBottomSheet is called", () => {
		const { result } = renderBottomSheetHook();
		const mockActions = [{ label: "Action 1", callback: jest.fn() }];

		act(() => {
			result.current.handleUpdateActions(mockActions);
		});

		act(() => {
			result.current.handleCloseBottomSheet();
		});

		expect(result.current.isVisible).toBe(false);
		expect(result.current.actions).toEqual([]);
	});
});
