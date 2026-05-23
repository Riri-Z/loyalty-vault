import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

type ThemeType = {
	textColor: string;
	secondaryColor: string;
	danger: string;
	bgColor: string;
	cardColor: string;
	tabIconColor: string;
	tabBgcolor: string;
};

type ContextType = ThemeType & {
	isDarkModeOn: boolean;
	toggleTheme: (activateDarkMode: boolean) => void;
};

const ThemeContext = createContext<ContextType>({} as ContextType);

const COLOR_PALETTE = {
	dark: {
		textColor: "#F2F3F4",
		secondaryColor: "#4CAF50",
		danger: "#C70000",
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

type ThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
	const colorScheme = useColorScheme();
	const [isDarkModeOn, setIsDarkModeOn] = useState(colorScheme === "dark");

	const toggleTheme = (activateDarkMode: boolean): void => {
		Appearance.setColorScheme(activateDarkMode ? "dark" : "light");
		setIsDarkModeOn((prev) => !prev);
	};

	useEffect(() => {
		AsyncStorage.setItem("theme", colorScheme ?? "light");
	}, [colorScheme]);

	const value = useMemo((): ContextType => {
		const theme = { ...COLOR_PALETTE[colorScheme ?? "light"] } as ThemeType;
		return { ...theme, isDarkModeOn, toggleTheme };
	}, [colorScheme, isDarkModeOn]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useColor = (): ContextType => {
	const context = useContext(ThemeContext);
	return context;
};
