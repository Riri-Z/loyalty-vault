import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
	const { i18n } = useTranslation();
	const { bgColor, tabBgcolor, textColor, tabIconColor, isDarkMode } = useColor();

	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor={bgColor} />
			<Tabs
				screenOptions={{
					headerShown: true,
					headerStyle: {
						backgroundColor: bgColor,
					},
					headerShadowVisible: true,
					tabBarActiveTintColor: tabIconColor,
					headerTitleStyle: {
						color: textColor,
						fontSize: 24,
						marginTop: 5,
					},
					sceneStyle: {
						backgroundColor: bgColor,
					},
					// Tab bar
					tabBarStyle: {
						backgroundColor: tabBgcolor,
						height: 70,
						borderTopWidth: 0,
						elevation: 5,
					},
					tabBarItemStyle: {
						margin: 10,
					},
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: i18n.t("tabs.home"),
						headerBackgroundContainerStyle: { backgroundColor: bgColor },
						animation: "fade",
						tabBarIcon: ({ color, focused }) => (
							<Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: i18n.t("tabs.settings"),
						headerBackgroundContainerStyle: { backgroundColor: bgColor },
						animation: "fade",
						tabBarIcon: ({ color, focused }) => (
							<Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
