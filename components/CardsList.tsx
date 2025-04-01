import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CardsInformation from "./CardsInformation";
import { Card } from "@/types/Card";
import CardViewer from "./CardViewer";

export const CardsList = ({ cards }: { cards: Card[] }) => {
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
	return (
		<View>
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
