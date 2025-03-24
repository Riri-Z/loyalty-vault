import React from "react";
import { FlatList, StyleSheet, View, StatusBar, TextInput, Text } from "react-native";
import CardsInformation from "./CardsInformation";
import { Cards } from "@/types/Cards";

export const FlatListBasics = ({ cards }: { cards: Cards[] }) => {
	return (
		<View style={styles.container}>
			<TextInput>
				<Text>
					<Text style={{ fontWeight: 900 }}>
						{cards.length > 0 ? "voici vos cards" : "Vous n'avez pas de cards"}
					</Text>
				</Text>
			</TextInput>

			<FlatList
				data={cards}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return <CardsInformation id={item.id} name={item.name} uri={item.uri} />;
				}}
				extraData={cards}
			/>
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
