import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
	const { i18n } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerTitleAlign: "center",
				headerShadowVisible: false,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: i18n.t("tabs.home"),
					animation: "fade", // Use fade animation for the home screen
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: i18n.t("tabs.settings"),
					animation: "fade", // Use fade animation for the home screen

					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
					),
				}}
			/>
		</Tabs>
	);
}
