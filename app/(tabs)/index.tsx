import { useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import FlatListBasics from "@/components/FlatListBasics";
import { useContext } from "react";
import { CardsContext } from "@/providers/cardsContext";

export default function Index() {
	const db = useSQLiteContext();
	const cards = useContext(CardsContext);
	const headerRight = () => {
		return (
			<TouchableOpacity onPress={() => router.push("/modal")} style={{ marginRight: 18 }}>
				<FontAwesome name="plus-circle" size={28} color={colors.primary}></FontAwesome>
			</TouchableOpacity>
		);
	};

	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Stack.Screen options={{ headerRight }} />
			<FlatListBasics item={cards}></FlatListBasics>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		gap: 20,
	},
	link: {},
	button: {},
});
