import { useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { FlatListBasics } from "@/components/FlatListBasics";
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { CardsContext, CardDispatchContext } from "@/providers/cardsContext";
import { getAllCards } from "@/providers/useDatabase";
import { Cards } from "@/types/Cards";

export default function Index() {
	const [cards, setCards] = useState<Cards[]>([]);

	useEffect(() => {
		async function loadCards() {
			const cards = await getAllCards();
			console.log("useEffec", cards);
			setCards(cards);
		}
		loadCards();
	}, []);
	console.log("cards!!!!", cards);

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
			{cards.length > 0 && <FlatListBasics cards={cards}></FlatListBasics>}
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
