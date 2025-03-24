import React, { useState } from "react";
import { FlatList, StyleSheet, View, StatusBar, TextInput, Text } from "react-native";
import CardsInformation from "./CardsInformation";
import { Card } from "@/types/Card";
import CardDetail from "./CardDetail";

export const FlatListBasics = ({ cards }: { cards: Card[] }) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [card, setCard] = useState<Card | null>(null);

	const onModalClose = () => {
		setIsModalVisible(false);
		setCard(null);
	};

	function handleSelectedCard(card: any) {
		console.log("card", card);
		setCard(card);
		setIsModalVisible(true);
	}
	return (
		<View style={styles.container}>
			<TextInput>
				<Text>
					<Text style={{ fontWeight: 900 }}>
						{cards.length > 0 ? "voici vos cards" : "Vous n'avez pas de cards"}
					</Text>
				</Text>
			</TextInput>

			{isModalVisible && card ? (
				<CardDetail
					isVisible={isModalVisible}
					name={card.name}
					src={card.uri}
					onClose={onModalClose}></CardDetail>
			) : (
				<FlatList
					data={cards}
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
		flex: 1,
		marginTop: StatusBar.currentHeight ?? 0,
	},
	text: {},
	title: {
		fontSize: 32,
	},

	item: {
		marginHorizontal: 20,
	},
});
