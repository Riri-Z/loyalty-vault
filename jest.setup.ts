import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo-sqlite", () => ({
	openDatabaseAsync: jest.fn(() => Promise.resolve({
		runAsync: jest.fn(() => Promise.resolve({ lastInsertRowId: 1, changes: 1 })),
		getAllAsync: jest.fn(() => Promise.resolve([])),
		execAsync: jest.fn(() => Promise.resolve()),
	})),
	addDatabaseChangeListener: jest.fn(() => ({ remove: jest.fn() })),
}));

jest.mock("expo-localization", () => ({
	getLocales: jest.fn(() => [{ languageCode: "en" }]),
}));

jest.mock("expo-router", () => ({
	router: { push: jest.fn(), replace: jest.fn(), back: jest.fn(), navigate: jest.fn() },
	useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn(), navigate: jest.fn() }),
	useLocalSearchParams: jest.fn(() => ({})),
	useNavigation: () => ({ addListener: jest.fn(() => jest.fn()) }),
	Stack: { Screen: "Stack.Screen" },
	Tabs: { Screen: "Tabs.Screen" },
	Link: "Link",
}));

jest.mock("expo-status-bar", () => ({
	StatusBar: "StatusBar",
}));

jest.mock("expo-system-ui", () => ({
	setBackgroundColorAsync: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
	launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })),
}));

jest.mock("expo-camera", () => ({
	useCameraPermissions: jest.fn(() => [true, jest.fn()]),
	CameraView: "CameraView",
}));

jest.mock("expo-clipboard", () => ({
	setStringAsync: jest.fn(),
	hasStringAsync: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("posthog-react-native", () => ({
	PostHogProvider: ({ children }: { children: React.ReactNode }) => children,
	usePostHog: () => ({ capture: jest.fn(), reset: jest.fn() }),
}));

jest.mock("react-native-toast-message", () => ({
	__esModule: true,
	default: { show: jest.fn() },
}));

jest.mock("lottie-react-native", () => "LottieView");

jest.mock("react-native-worklets", () => ({
	default: jest.fn(),
	useSharedValue: jest.fn(() => ({ value: 0 })),
	runOnJS: jest.fn((fn) => fn),
	makeMutable: jest.fn((val) => ({ value: val })),
}));

jest.mock("react-native-reanimated", () => {
	const RN = jest.requireActual("react-native");
	return {
		__esModule: true,
		default: {
			View: RN.View,
			createAnimatedComponent: (component: React.ComponentType) => component,
		},
		useSharedValue: jest.fn(() => ({ value: 0 })),
		useAnimatedStyle: jest.fn(() => ({})),
		useDerivedValue: jest.fn(() => ({ value: 0 })),
		withSpring: jest.fn((val: unknown) => val),
		withTiming: jest.fn((val: unknown) => val),
		runOnJS: jest.fn((fn: Function) => fn),
		FadeInDown: { entering: jest.fn() },
		FadeOut: { exiting: jest.fn() },
		FadeInLeft: { entering: jest.fn() },
		FadeOutRight: { exiting: jest.fn() },
	};
});

jest.mock("react-native-gesture-handler", () => {
	return {
		Gesture: { Pan: () => ({ onChange: () => ({ onEnd: () => ({}) }) }) },
		GestureDetector: ({ children }: { children: React.ReactNode }) => children,
		GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
		Directions: {},
		State: {},
	};
});

jest.mock("react-native-paper", () => ({
	PaperProvider: ({ children }: { children: React.ReactNode }) => children,
	Portal: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");
jest.mock("@expo/vector-icons/Entypo", () => "Entypo");
jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");
jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@expo/vector-icons/FontAwesome5", () => "FontAwesome5");
jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => "MaterialCommunityIcons");
jest.mock("@expo/vector-icons/Fontisto", () => "Fontisto");
jest.mock("@expo/vector-icons/Octicons", () => "Octicons");

jest.mock("expo-image", () => ({
	Image: "Image",
}));

jest.mock("expo-font", () => ({
	isLoaded: jest.fn(() => true),
	Font: { isLoaded: jest.fn(() => true) },
}));

jest.mock("@/i18n", () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock("i18next", () => ({
	t: jest.fn((key) => key),
	use: jest.fn(() => ({ init: jest.fn() })),
	createInstance: jest.fn(() => ({ use: jest.fn(() => ({ init: jest.fn() })) })),
}));

jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: jest.fn((key) => key),
		i18n: { changeLanguage: jest.fn(), language: "en" },
	}),
	initReactI18next: { type: "3rdParty", init: jest.fn() },
}));

jest.mock("react-native", () => {
	const RN = jest.requireActual("react-native");
	RN.Alert = { alert: jest.fn() };
	RN.Switch = "Switch";
	RN.Keyboard = { isVisible: jest.fn(() => false), dismiss: jest.fn() };
	return RN;
});

beforeEach(() => {
	jest.clearAllMocks();
});
