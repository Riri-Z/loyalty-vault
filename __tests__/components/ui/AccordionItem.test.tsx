import React from "react";
import { render } from "@testing-library/react-native";
import { AccordionItem } from "@/components/ui/AccordionItem";

describe("AccordionItem", () => {
	it("should render children", () => {
		const isExpanded = { value: true };
		const { UNSAFE_getByType } = render(
			<AccordionItem isExpanded={isExpanded} viewKey="test">
				<React.Fragment />
			</AccordionItem>,
		);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});

	it("should render with custom duration", () => {
		const isExpanded = { value: false };
		const { UNSAFE_getByType } = render(
			<AccordionItem isExpanded={isExpanded} viewKey="test" duration={1000}>
				<React.Fragment />
			</AccordionItem>,
		);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});

	it("should render with custom style", () => {
		const isExpanded = { value: true };
		const { UNSAFE_getByType } = render(
			<AccordionItem isExpanded={isExpanded} viewKey="test" style={{ marginTop: 10 }}>
				<React.Fragment />
			</AccordionItem>,
		);

		expect(UNSAFE_getByType("View")).toBeTruthy();
	});
});
