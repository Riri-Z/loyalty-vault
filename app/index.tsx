import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Pressable,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from "react-native";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import { useColor } from "@/providers/ThemeProvider";
import Onboarding from "@/components/OnBoarding";

export default function HomeScreen() {
	const flatListRef = useRef<FlatList>(null);
	const router = useRouter();

	const { secondaryColor } = useColor();
	const [loading, setLoading] = useState(true);
	const [steps, setSteps] = useState(0);

	useEffect(() => {
		async function getFirstLaunch() {
			try {
				// Check if it is user's first connexion
				const onBoardingSteps = await AsyncStorage.getItem("onBoardingSteps");
				if (onBoardingSteps) {
					return handleEndOnboarding();
				} else {
					setLoading(false);
				}
			} catch (e) {
				console.error(e);
				setLoading(false);
			}
		}
		getFirstLaunch();
	}, []);

	async function handleNextSteps() {
		if (steps < DATA_ON_BOARDING.length - 1) {
			const newStep = steps + 1;
			setSteps(newStep);
			flatListRef.current?.scrollToIndex({ index: newStep, animated: true });
		} else {
			// End of onboarding
			handleEndOnboarding();
		}
	}

	// Redirect user to home page
	async function handleEndOnboarding() {
		await AsyncStorage.setItem("onBoardingSteps", "3");
		return router.push("/(tabs)");
	}

	// Data for onboarding screens
	const DATA_ON_BOARDING = [
		{
			id: 1,
			title: "Gagne du temps",
			icon: require("../assets/images/credit-card.svg"),
			text: "Sauvegardez toutes vos cartes de fidélité au même endroit",
		},
		{
			id: 2,
			title: "Fonctionne sans connexion",
			icon: require("../assets/images/credit-card.svg"),
			text: "Pas besoin de 4g ou WI-FI. \n Accés rapide à vos carte à tout moment",
		},
		{
			id: 3,
			title: "100 % Local et Privé",
			icon: require("../assets/images/icon.png"),
			text: "Vos données restent sur votre téléphone.\n Pas de cloud, pas de compte",
		},
	];

	function handleJumpSteps(step: number) {
		flatListRef.current?.scrollToIndex({ index: step, animated: true });

		setSteps(step);
	}

	// Compute new step when user scroll onBoarding screens
	const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const layoutWidth = event.nativeEvent.layoutMeasurement.width; // Width device
		const newIndex = Math.round(offsetX / layoutWidth);
		setSteps(newIndex);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<View style={[styles.container]}>
					<FlatList
						ref={flatListRef}
						horizontal
						pagingEnabled
						data={DATA_ON_BOARDING}
						renderItem={({ item }) => <Onboarding {...item} />}
						keyExtractor={(_, index) => index.toString()}
						onMomentumScrollEnd={handleScrollEnd}
					/>
					<View style={{ flexDirection: "row" }}>
						{DATA_ON_BOARDING.map((e, index) => (
							<Pressable
								key={e.id}
								onPress={() => handleJumpSteps(index)}
								style={{
									width: 8,
									height: 8,
									borderRadius: 4,
									backgroundColor: index === steps ? secondaryColor : "#ccc",
									marginHorizontal: 4,
								}}
							/>
						))}
					</View>
					<Pressable
						style={[
							{
								backgroundColor: "red",
								padding: 10,
								borderRadius: 999,
								width: 80,
								alignItems: "center",
								marginBottom: 10,
							},
							{ backgroundColor: secondaryColor },
						]}
						onPress={handleNextSteps}>
						<Text style={{ color: "#ffff" }}>
							{steps === DATA_ON_BOARDING.length - 1 ? "Terminer" : "Next"}
						</Text>
					</Pressable>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
