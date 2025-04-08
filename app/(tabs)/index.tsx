import { CardsList } from "@/components/CardsList";
import { useEffect, useState } from "react";
import { getAllCards } from "@/providers/useDatabase";
import { Card } from "@/types/Card";
import { addDatabaseChangeListener } from "expo-sqlite";
import ViewContainer from "@/components/ui/ViewContainer";
import AddCardButton from "@/components/ui/AddCardbutton";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const creditCardLogo = require("../../assets/lottie/cards-animated.json");

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
					<LottieView source={creditCardLogo} style={styles.image} autoPlay loop />
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
		gap: 30,
		paddingHorizontal: 20,
	},
	image: {
		width: 250,
		height: 150,
	},
	text: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: "bold",
		color: "gray",
		textAlign: "center",
	},
});
