import { createContext, ReactNode, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

const MyThemeContext = createContext<Context>({} as Context);

interface Context extends Theme {
	isDarkMode: boolean;
}

type Theme = {
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

	const value = useMemo(() => {
		return { ...COLOR_PALETTE[colorScheme ?? "light"], isDarkMode: colorScheme === "dark" };
	}, [colorScheme]);

	return <MyThemeContext.Provider value={value}>{children}</MyThemeContext.Provider>;
}

function useColor() {
	const context = useContext(MyThemeContext);

	return context;
}

export { useColor, ThemeProvider };
