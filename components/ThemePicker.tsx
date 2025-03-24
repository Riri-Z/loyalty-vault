import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Appearance, Platform, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme, useColorScheme } from "nativewind";

export default function ThemePicker() {
	const { setColorScheme, toggleColorScheme, colorScheme } = useColorScheme();

	const [isDarkModeOn, setIsDarkModeOn] = useState(colorScheme === "dark");

	const toggleSwitch = () => {
		toggleColorScheme();
		setIsDarkModeOn((prev) => !prev);
		AsyncStorage.setItem("theme", colorScheme ?? "light");
		console.log("colorScheme", colorScheme);
		setColorScheme(colorScheme === "dark" ? "light" : "dark");
	};
	return (
		<View className="bg-white dark:bg-slate-800">
			<View className="flex flex-row w-7 bg-slate-500">
				<Text className="text-black dark:text-red-500">Light</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor="#3e3e3e"
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isDarkModeOn}
				/>
				<Text>Dark</Text>
			</View>
		</View>
	);
}
