import { render } from "@testing-library/react-native";
import { OnBoarding } from "@/components/shared/OnBoarding";

jest.mock("@/providers/ThemeContext", () => ({
	useColor: () => ({ bgColor: "#ffffff", textColor: "#000000" }),
}));

jest.mock("lottie-react-native", () => "LottieView");

describe("OnBoarding", () => {
	it("should render title and text", () => {
		const { getByText } = render(
			<OnBoarding
				title="onBoarding.screen1.title"
				text="onBoarding.screen1.text"
				icon={1}
				isLottie={true}
			/>,
		);

		expect(getByText("onBoarding.screen1.title")).toBeTruthy();
		expect(getByText("onBoarding.screen1.text")).toBeTruthy();
	});

	it("should render LottieView when isLottie is true", () => {
		const { UNSAFE_getByType } = render(
			<OnBoarding
				title="onBoarding.screen1.title"
				text="onBoarding.screen1.text"
				icon={1}
				isLottie={true}
			/>,
		);

		expect(UNSAFE_getByType("LottieView")).toBeTruthy();
	});

	it("should render Image when isLottie is false", () => {
		const { UNSAFE_getByType } = render(
			<OnBoarding
				title="onBoarding.screen3.title"
				text="onBoarding.screen3.text"
				icon="test-icon"
				isLottie={false}
			/>,
		);

		expect(UNSAFE_getByType("Image")).toBeTruthy();
	});
});
