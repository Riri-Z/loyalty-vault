import { CardsList } from "@/components/shared/CardsList";
import { useContext, useEffect } from "react";
import { ViewContainer } from "@/components/ui/ViewContainer";
import { AddCardButton } from "@/components/ui/AddCardButton";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { CardContext } from "@/providers/CardContext";
import { useNavigation } from "expo-router";
import { BottomSheetContext } from "@/providers/BottomSheetContext";
import { SearchCard } from "@/components/shared/SearchCard";

const creditCardLogo = require("../../assets/lottie/cards-animated.json");

export default function Index(): JSX.Element {
	const { t } = useTranslation();
	const { cards, filteredCards, loading, searchValue } = useContext(CardContext);
	const { isVisible, handleCloseBottomSheet } = useContext(BottomSheetContext);

	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			if (isVisible) {
				handleCloseBottomSheet();
			}
		});

		return unsubscribe;
	}, [navigation, isVisible, handleCloseBottomSheet]);

	return (
		<ViewContainer>
			{Array.isArray(cards) && cards.length === 0 && searchValue === null ? (
				<View style={styles.container}>
					<LottieView source={creditCardLogo} style={styles.image} autoPlay loop />
					<Text style={styles.text}>{t("cards.cta.registerFirstCard")}</Text>
				</View>
			) : (
				<>
					<SearchCard />
					{loading ? (
						<ActivityIndicator style={styles.loading} size="large" />
					) : (
						<View style={styles.cardsContainer}>
							<CardsList cards={searchValue && searchValue.trim().length > 0 ? filteredCards : cards} />
						</View>
					)}
				</>
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
	cardsContainer: { gap: 20, width: "100%" },
	loading: {
		margin: "auto",
	},
});
