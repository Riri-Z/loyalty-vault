import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
	const { colors } = useTheme();
	const { i18n } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerTitleAlign: "center",
				tabBarActiveTintColor: colors.primary,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerShadowVisible: false,
				headerTintColor: colors.text,
				tabBarStyle: {
					backgroundColor: colors.background,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: i18n.t("tabs.home"),
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: i18n.t("tabs.settings"),
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
					),
				}}
			/>
		</Tabs>
	);
}
