import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CardsInformation from "./CardsInformation";
import { Card } from "@/types/Card";
import CardViewer from "./CardViewer";
import useColor from "@/hooks/useColor";
import { useTranslation } from "react-i18next";

export const FlatListBasics = ({ cards }: { cards: Card[] }) => {
	const { t } = useTranslation();
	const { textColor } = useColor();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [card, setCard] = useState<Card | null>(null);

	const onModalClose = () => {
		setIsModalVisible(false);
		setCard(null);
	};

	function handleSelectedCard(card: Card) {
		setCard(card);
		setIsModalVisible(true);
	}
	return cards.length === 0 ? (
		<Text style={[styles.emptyText, { color: textColor }]}>{t("cards.cta.registerFirstCard")}</Text>
	) : (
		<View style={styles.container}>
			{isModalVisible && card ? (
				<CardViewer
					isVisible={isModalVisible}
					name={card.name}
					src={card.uri}
					onClose={onModalClose}></CardViewer>
			) : (
				<FlatList
					style={styles.list}
					data={cards}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						return (
							<CardsInformation
								id={item.id}
								name={item.name}
								uri={item.uri}
								openCardDetail={() => handleSelectedCard(item)}
							/>
						);
					}}
					extraData={cards}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		gap: 10,
	},
	text: {
		margin: "auto",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	emptyText: {},
	list: {
		gap: 20,
	},
});
