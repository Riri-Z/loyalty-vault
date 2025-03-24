import { useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlatListBasics } from "@/components/FlatListBasics";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { getAllCards } from "@/providers/useDatabase";
import { Cards } from "@/types/Cards";
import { addDatabaseChangeListener } from "expo-sqlite";

export default function Index() {
	const [cards, setCards] = useState<Cards[]>([]);

	useEffect(() => {
		//  Allow to load displayed cards
		async function loadCards() {
			const cards = await getAllCards();
			setCards(cards);
		}
		loadCards();

		const listener = addDatabaseChangeListener(() => {
			loadCards(); // Reload cards
		});

		return () => listener.remove();
	}, []);

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
			<FlatListBasics cards={cards}></FlatListBasics>
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
