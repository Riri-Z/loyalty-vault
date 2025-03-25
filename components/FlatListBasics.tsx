import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import CardsInformation from "./CardsInformation";
import { Card } from "@/types/Card";
import CardDetail from "./CardDetail";
import useColor from "@/hooks/useColor";
import { useTranslation } from "react-i18next";

export const FlatListBasics = ({ cards }: { cards: Card[] }) => {
	const { t } = useTranslation();
	const { color, bgColor, cardColor } = useColor();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [card, setCard] = useState<Card | null>(null);

	const onModalClose = () => {
		setIsModalVisible(false);
		setCard(null);
	};

	function handleSelectedCard(card: any) {
		setCard(card);
		setIsModalVisible(true);
	}
	return (
		<View style={{ height: "100%", gap: 10 }}>
			{cards.length > 0 && (
				<Text style={{ color, margin: "auto", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
					{t("home.emptyCards")}
				</Text>
			)}

			{isModalVisible && card ? (
				<CardDetail
					isVisible={isModalVisible}
					name={card.name}
					src={card.uri}
					onClose={onModalClose}></CardDetail>
			) : (
				<FlatList
					style={{ gap: 20 }}
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
