import { CardsList } from "@/components/CardsList";
import { useContext, useEffect } from "react";
import ViewContainer from "@/components/ui/ViewContainer";
import AddCardButton from "@/components/ui/AddCardbutton";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { CardContext } from "@/providers/CardContext";
import { useNavigation } from "expo-router";
import { BottomSheetContext } from "@/providers/BottomSheetContext";

const creditCardLogo = require("../../assets/lottie/cards-animated.json");

export default function Index() {
	const { t } = useTranslation();
	const { cards } = useContext(CardContext);
	const { isVisible, handleCloseBottomSheet } = useContext(BottomSheetContext);

	const navigation = useNavigation();

	// Close bottomSheet if it's open
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", (e) => {
			if (isVisible) {
				handleCloseBottomSheet();
			}
		});

		return unsubscribe;
	}, [navigation, isVisible, handleCloseBottomSheet]);

	return (
		<ViewContainer>
			{Array.isArray(cards) && cards.length === 0 ? (
				<View style={styles.container}>
					<LottieView source={creditCardLogo} style={styles.image} autoPlay loop />
					<Text style={[styles.text]}>{t("cards.cta.registerFirstCard")}</Text>
				</View>
			) : (
				<CardsList cards={cards}></CardsList>
			)}

			<AddCardButton />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
		paddingHorizontal: 20,
	},
	image: {
		width: 250,
		height: 150,
	},
	text: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: "bold",
		color: "gray",
		textAlign: "center",
	},
});
