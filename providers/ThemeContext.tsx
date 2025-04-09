import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

const ThemeContext = createContext<ContextType>({} as ContextType);

interface ContextType extends ThemeType {
	isDarkModeOn: boolean;
	toggleTheme: (activateDarkMode: boolean) => void;
}

type ThemeType = {
	textColor: string;
	secondaryColor: string;
	danger: string;
	bgColor: string;
	cardColor: string;
	tabIconColor: string;
	tabBgcolor: string;
};

const COLOR_PALETTE = {
	dark: {
		textColor: "#F2F3F4",
		secondaryColor: "#4CAF50",
		danger: "#D32F2F",
		bgColor: "#1A1A1A",
		cardColor: "#3b3939",
		tabIconColor: "white",
		tabBgcolor: "black",
	},
	light: {
		textColor: "#181818",
		secondaryColor: "#4CAF50",
		danger: "#D32F2F",
		bgColor: "#F5F5F5",
		cardColor: "#ffffff",
		tabIconColor: "#4CAF50",
		tabBgcolor: "white",
	},
};

function ThemeProvider({ children }: { children: ReactNode }) {
	const colorScheme = useColorScheme();
	const [isDarkModeOn, setIsDarkModeOn] = useState(colorScheme === "dark");

	const toggleTheme = (activateDarkMode: boolean) => {
		Appearance.setColorScheme(activateDarkMode ? "dark" : "light");
		setIsDarkModeOn((prev) => !prev);
	};

	// Save to storage
	useEffect(() => {
		AsyncStorage.setItem("theme", colorScheme ?? "light");
	}, [colorScheme]);

	const value = useMemo(() => {
		const theme = { ...COLOR_PALETTE[colorScheme ?? "light"] } as ThemeType;
		return { ...theme, isDarkModeOn, toggleTheme };
	}, [colorScheme, isDarkModeOn]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useColor() {
	const context = useContext(ThemeContext);

	return context;
}

export { useColor, ThemeProvider };
