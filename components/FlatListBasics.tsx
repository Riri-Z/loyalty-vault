import React, { useState } from "react";
import { FlatList, StyleSheet, View, StatusBar, TextInput, Text } from "react-native";
import CardsInformation from "./CardsInformation";
import { Card } from "@/types/Card";
import CardDetail from "./CardDetail";
import { colorScheme, useColorScheme } from "nativewind";

export const FlatListBasics = ({ cards }: { cards: Card[] }) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [card, setCard] = useState<Card | null>(null);

	const { setColorScheme, toggleColorScheme, colorScheme } = useColorScheme();

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
		<View className="m-auto">
			<TextInput>
				<Text>
					<Text className="text-green-400 dark:text-red-600">
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
