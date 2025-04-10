import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, Portal } from "react-native-paper";
import BottomSheet from "@/components/ui/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useContext } from "react";
import { BottomSheetContext } from "@/providers/BottomSheetContext";

export default function TabLayout() {
	const { i18n } = useTranslation();
	const { bgColor, tabBgcolor, textColor, tabIconColor, isDarkModeOn } = useColor();
	const { isVisible, handleCloseBottomSheet, actions } = useContext(BottomSheetContext);

	return (
		<>
			<StatusBar style={isDarkModeOn ? "light" : "dark"} backgroundColor={bgColor} />
			<PaperProvider>
				<Tabs
					screenOptions={{
						headerShown: true,
						headerStyle: {
							backgroundColor: bgColor,
						},
						headerShadowVisible: true,
						headerBackgroundContainerStyle: { backgroundColor: bgColor },
						animation: "none",
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
								<Ionicons
									name={focused ? "settings" : "settings-outline"}
									color={color}
									size={24}
								/>
							),
						}}
					/>
				</Tabs>
				<Portal>
					{isVisible && (
						<GestureHandlerRootView>
							<BottomSheet actionsItems={actions} handleClose={handleCloseBottomSheet} />
						</GestureHandlerRootView>
					)}
				</Portal>
			</PaperProvider>
		</>
	);
}
