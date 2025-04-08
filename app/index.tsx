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
import { StatusBar } from "expo-status-bar";
import { t } from "i18next";

export default function HomeScreen() {
	const flatListRef = useRef<FlatList>(null);
	const router = useRouter();

	const { secondaryColor, bgColor } = useColor();
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
			} finally {
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
			title: "onBoarding.screen1.title",
			icon: require("../assets/lottie/cards-animated.json"),
			text: "onBoarding.screen1.text",
			isLottie: true,
		},
		{
			id: 2,
			title: "onBoarding.screen2.title",
			icon: require("../assets/lottie/offline.json"),
			text: "onBoarding.screen2.text",
			isLottie: true,
		},
		{
			id: 3,
			title: "onBoarding.screen3.title",
			icon: require("../assets/images/private-file.svg"),
			text: "onBoarding.screen3.text",
			isLottie: false,
		},
	];

	// Handle click on dot
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
			<StatusBar translucent backgroundColor={bgColor} />
			{loading ? (
				<Loading />
			) : (
				<View style={[styles.container, { backgroundColor: bgColor }]}>
					<FlatList
						ref={flatListRef}
						horizontal
						pagingEnabled
						data={DATA_ON_BOARDING}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => <Onboarding {...item} />}
						keyExtractor={(_, index) => index.toString()}
						onMomentumScrollEnd={handleScrollEnd}
					/>
					<View style={styles.dotsContainer}>
						{DATA_ON_BOARDING.map((e, index) => (
							<Pressable
								key={e.id}
								onPress={() => handleJumpSteps(index)}
								style={[styles.dot, { backgroundColor: index === steps ? secondaryColor : "#ccc" }]}
							/>
						))}
					</View>
					<Pressable
						style={[styles.button, { backgroundColor: secondaryColor }]}
						onPress={handleNextSteps}>
						<Text style={{ color: "#ffff" }}>
							{steps === DATA_ON_BOARDING.length - 1 ? t("onBoarding.end") : t("onBoarding.next")}
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
		paddingBottom: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	dotsContainer: { flexDirection: "row", marginBottom: 20 },
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	button: {
		padding: 10,
		borderRadius: 999,
		width: 100,
		alignItems: "center",
	},
});
