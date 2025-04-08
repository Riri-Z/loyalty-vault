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

	// Open cardViewer
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
					src={card.fileUri}
					onClose={onModalClose}></CardViewer>
			) : (
				<FlatList
					contentContainerStyle={styles.list}
					data={cards}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						return (
							<CardsInformation
								id={item.id}
								name={item.name}
								fileUri={item.fileUri}
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
	list: {
		gap: 16,
	},
});
