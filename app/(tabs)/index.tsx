import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlatListBasics } from "@/components/FlatListBasics";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";
import ViewContainer from "@/components/ui/ViewContainer";

export default function Index() {
	const [cards, setCards] = useState<Card[]>([]);

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
				<FontAwesome name="plus-circle" size={28}></FontAwesome>
			</TouchableOpacity>
		);
	};

	return (
		<ViewContainer>
			<Stack.Screen options={{ headerRight }} />
			<FlatListBasics cards={cards}></FlatListBasics>
		</ViewContainer>
	);
}
