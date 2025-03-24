import { router, Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlatListBasics } from "@/components/FlatListBasics";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";

export default function Index() {
	const [cards, setCards] = useState<Card[]>([]);

	useEffect(() => {
		//  Allow to load displayed cards
		async function loadCards() {
			const cards = await getAllCards();
			console.log("cards from dbb", cards);
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
				<FontAwesome name="plus-circle" size={28}></FontAwesome>
			</TouchableOpacity>
		);
	};

	return (
		<View className="h-[500] w-[300] m-auto">
			<Stack.Screen options={{ headerRight }} />
			<FlatListBasics cards={cards}></FlatListBasics>
		</View>
	);
}
