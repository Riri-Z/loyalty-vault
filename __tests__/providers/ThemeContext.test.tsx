import { renderHook, act } from "@testing-library/react-native";
import { useColor, ThemeProvider } from "@/providers/ThemeContext";

jest.mock("react-native", () => {
	const mockUseColorScheme = jest.fn(() => "light");
	const mockSetAppearance = jest.fn();

	return {
		useColorScheme: mockUseColorScheme,
		Appearance: { setColorScheme: mockSetAppearance },
		Platform: { OS: "ios" },
		StyleSheet: { create: (styles: Record<string, unknown>) => styles },
		View: "View",
		Text: "Text",
		TouchableOpacity: "TouchableOpacity",
		Pressable: "Pressable",
		Modal: "Modal",
		ScrollView: "ScrollView",
		FlatList: "FlatList",
		SafeAreaView: "SafeAreaView",
		ActivityIndicator: "ActivityIndicator",
		TextInput: "TextInput",
		Image: "Image",
		Switch: "Switch",
		Alert: { alert: jest.fn() },
		Keyboard: { isVisible: jest.fn(() => false), dismiss: jest.fn() },
		Animated: { View: "Animated.View" },
		Dimensions: { get: () => ({ width: 375, height: 812 }) },
		__mocks__: {
			useColorScheme: mockUseColorScheme,
			setAppearance: mockSetAppearance,
		},
	};
});

describe("ThemeProvider", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue("light");
	});

	it("should provide light theme values when colorScheme is light", () => {
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue("light");

		const { result } = renderHook(() => useColor(), {
			wrapper: ThemeProvider,
		});

		expect(result.current.textColor).toBe("#181818");
		expect(result.current.bgColor).toBe("#F5F5F5");
		expect(result.current.cardColor).toBe("#ffffff");
		expect(result.current.secondaryColor).toBe("#4CAF50");
		expect(result.current.danger).toBe("#D32F2F");
		expect(result.current.tabIconColor).toBe("#4CAF50");
		expect(result.current.tabBgcolor).toBe("white");
		expect(result.current.isDarkModeOn).toBe(false);
	});

	it("should provide dark theme values when colorScheme is dark", () => {
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue("dark");

		const { result } = renderHook(() => useColor(), {
			wrapper: ThemeProvider,
		});

		expect(result.current.textColor).toBe("#F2F3F4");
		expect(result.current.bgColor).toBe("#1A1A1A");
		expect(result.current.cardColor).toBe("#3b3939");
		expect(result.current.tabIconColor).toBe("white");
		expect(result.current.tabBgcolor).toBe("black");
		expect(result.current.isDarkModeOn).toBe(true);
	});

	it("should toggle theme to dark", () => {
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue("light");

		const { result } = renderHook(() => useColor(), {
			wrapper: ThemeProvider,
		});

		expect(result.current.isDarkModeOn).toBe(false);

		act(() => {
			result.current.toggleTheme(true);
		});

		expect(RN.__mocks__.setAppearance).toHaveBeenCalledWith("dark");
	});

	it("should toggle theme to light", () => {
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue("dark");

		const { result } = renderHook(() => useColor(), {
			wrapper: ThemeProvider,
		});

		act(() => {
			result.current.toggleTheme(false);
		});

		expect(RN.__mocks__.setAppearance).toHaveBeenCalledWith("light");
	});

	it("should default to light when colorScheme is null", () => {
		const RN = require("react-native");
		RN.__mocks__.useColorScheme.mockReturnValue(null);

		const { result } = renderHook(() => useColor(), {
			wrapper: ThemeProvider,
		});

		expect(result.current.textColor).toBe("#181818");
		expect(result.current.bgColor).toBe("#F5F5F5");
		expect(result.current.isDarkModeOn).toBe(false);
	});
});
