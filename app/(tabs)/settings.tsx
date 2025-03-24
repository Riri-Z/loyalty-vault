import { View, Text } from "react-native";
import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import { useColorScheme } from "nativewind";

export default function SettingsScreen() {
	const { colorScheme } = useColorScheme();
	console.log("colorScheme", colorScheme);
	return (
		<View>
			<View>
				<Text className="text-black dark:text-red-500">Preferences</Text>
				<View className="bg-slate-200">
					<LanguagePicker />
					<ThemePicker />
				</View>
			</View>
		</View>
	);
}
