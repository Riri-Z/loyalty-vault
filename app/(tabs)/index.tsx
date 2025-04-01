import { CardsList } from "@/components/CardsList";
import { useEffect, useState } from "react";
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";
import ViewContainer from "@/components/ui/ViewContainer";
import AddCardButton from "@/components/ui/AddCardbutton";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";

const creditCardLogo = require("../../assets/images/credit-card.svg");

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
				<View style={styles.container}>
					<Image
						style={styles.image}
						contentFit="contain"
						source={creditCardLogo}
						alt="credit card"
					/>
					<Text style={[styles.text]}>{t("cards.cta.registerFirstCard")}</Text>
				</View>
			) : (
				<CardsList cards={cards}></CardsList>
			)}

			<AddCardButton />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	image: {
		width: 150,
		height: 150,
	},
	text: {
		marginTop: 20,
		fontSize: 16,
		color: "gray",
		textAlign: "center",
	},
});
