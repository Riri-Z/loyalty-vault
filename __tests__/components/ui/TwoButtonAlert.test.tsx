import { Alert } from "react-native";
import { TwoButtonAlert } from "@/components/ui/TwoButtonAlert";

describe("TwoButtonAlert", () => {
	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should call Alert.alert with correct parameters", () => {
		const handleOk = jest.fn();

		TwoButtonAlert({
			title: "Test Title",
			content: "Test Content",
			textCancel: "No",
			textOk: "Yes",
			handleOk,
		});

		expect(Alert.alert).toHaveBeenCalledWith(
			"Test Title",
			"Test Content",
			[
				{ text: "No", style: "cancel" },
				{ text: "Yes", onPress: handleOk },
			],
			{ cancelable: true },
		);
	});

	it("should use default values when not provided", () => {
		const handleOk = jest.fn();

		TwoButtonAlert({
			title: "",
			content: "",
			handleOk,
		});

		expect(Alert.alert).toHaveBeenCalledWith(
			"",
			"",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "OK", onPress: handleOk },
			],
			{ cancelable: true },
		);
	});

	it("should respect cancelable prop", () => {
		const handleOk = jest.fn();

		TwoButtonAlert({
			title: "Title",
			content: "Content",
			handleOk,
			cancelable: false,
		});

		expect(Alert.alert).toHaveBeenCalledWith(
			"Title",
			"Content",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "OK", onPress: handleOk },
			],
			{ cancelable: false },
		);
	});
});
