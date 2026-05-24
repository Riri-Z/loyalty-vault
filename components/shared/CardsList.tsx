import { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { CardsInformation } from "./CardsInformation";
import { Card } from "@/types/Card";
import { CardViewer } from "./CardViewer";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";

type Props = {
	cards: Card[];
};

export const CardsList = ({ cards }: Props): JSX.Element => {
	const { t } = useTranslation();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [card, setCard] = useState<Card | null>(null);
	const { textColor } = useColor();

	const onModalClose = (): void => {
		setIsModalVisible(false);
		setCard(null);
	};

	const handleSelectedCard = (selectedCard: Card): void => {
		setCard(selectedCard);
		setIsModalVisible(true);
	};

	return (
		<View style={styles.container}>
			<Text style={{ color: textColor }}>
				{cards.length} {t("cards.searchInput.result")}
			</Text>
			{isModalVisible && card ? (
				<CardViewer isVisible={isModalVisible} name={card.name} src={card.fileUri} onClose={onModalClose} />
			) : (
				<FlatList
					contentContainerStyle={styles.list}
					data={cards}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<CardsInformation
							id={item.id}
							name={item.name}
							fileUri={item.fileUri}
							storeId={item.storeId}
							cardNumber={item.cardNumber}
							openCardDetail={() => handleSelectedCard(item)}
						/>
					)}
					extraData={cards}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
		paddingBottom: 100,
	},
	list: {
		gap: 16,
	},
});
