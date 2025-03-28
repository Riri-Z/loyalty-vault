import { FlatListBasics } from "@/components/FlatListBasics";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";
import ViewContainer from "@/components/ui/ViewContainer";
import AddCardButton from "@/components/ui/AddCardbutton";
import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function Index() {
	const { t } = useTranslation();

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
			{cards.length === 0 ? (
				<Text style={[styles.text]}>{t("cards.cta.registerFirstCard")}</Text>
			) : (
				<FlatListBasics cards={cards}></FlatListBasics>
			)}

			<AddCardButton />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	text: {
		position: "absolute",
		top: 200,
		left: 25,
		fontSize: 25,
		color: "#808080",
	},
});
