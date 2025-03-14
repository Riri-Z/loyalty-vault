import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CardsInformation from "./CardsInformation";
import { Cards } from "@/types/Cards";

const FlatListBasics = (cards: Cards[]) => {
	console.log(cards);
	return (
		<View style={styles.container}>
			<FlatList
				style={styles.item}
				data={cards}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <CardsInformation name={item.name} uri={item.uri} />}
			/>
		</View>
	);
};

export default FlatListBasics;

const styles = StyleSheet.create({
	container: {},
	text: {},
	item: {
		marginHorizontal: 20,
	},
});
