import React, { useState } from "react";
import { FlatList, StyleSheet, View, StatusBar, TextInput, Text } from "react-native";
import CardsInformation from "./CardsInformation";

export const FlatListBasics = ({ cards }: any) => {
	return (
		<View style={styles.container}>
			<TextInput>
				<Text>
					<Text style={{ fontWeight: 900 }}>Some bold text</Text>Some regular text
				</Text>
			</TextInput>

			{cards && (
				<FlatList
					data={cards}
					keyExtractor={(item) => item.id.toString()}
					/* 				renderItem={renderItem} */
					renderItem={({ item }) => {
						return <CardsInformation name={item.name} uri={item.uri} />;
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
		marginTop: StatusBar.currentHeight || 0,
	},
	text: {},
	title: {
		fontSize: 32,
	},

	item: {
		marginHorizontal: 20,
	},
});
