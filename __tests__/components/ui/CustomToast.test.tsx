import React from "react";
import { render } from "@testing-library/react-native";
import { toastConfig } from "@/components/ui/CustomToast";
import { BaseToastProps } from "react-native-toast-message";

describe("CustomToast", () => {
	it("should render success toast with text1", () => {
		const props = { text1: "Success message" } as BaseToastProps;
		const SuccessToast = toastConfig.success;
		const { getByText } = render(<SuccessToast {...props} />);

		expect(getByText("Success message")).toBeTruthy();
	});

	it("should render success toast with text1 and text2", () => {
		const props = { text1: "Success message", text2: "Additional info" } as BaseToastProps;
		const SuccessToast = toastConfig.success;
		const { getByText } = render(<SuccessToast {...props} />);

		expect(getByText("Success message")).toBeTruthy();
		expect(getByText("Additional info")).toBeTruthy();
	});

	it("should render error toast with text1", () => {
		const props = { text1: "Error message" } as BaseToastProps;
		const ErrorToast = toastConfig.error;
		const { getByText } = render(<ErrorToast {...props} />);

		expect(getByText("Error message")).toBeTruthy();
	});

	it("should render error toast with text1 and text2", () => {
		const props = { text1: "Error message", text2: "Error details" } as BaseToastProps;
		const ErrorToast = toastConfig.error;
		const { getByText } = render(<ErrorToast {...props} />);

		expect(getByText("Error message")).toBeTruthy();
		expect(getByText("Error details")).toBeTruthy();
	});
});
