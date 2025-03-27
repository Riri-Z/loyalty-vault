import { FlatListBasics } from "@/components/FlatListBasics";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";
import ViewContainer from "@/components/ui/ViewContainer";
import AddCardButton from "@/components/ui/AddCardbutton";

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

	return (
		<ViewContainer>
			{/* List of cards */}
			<FlatListBasics cards={cards}></FlatListBasics>
			<AddCardButton />
		</ViewContainer>
	);
}
