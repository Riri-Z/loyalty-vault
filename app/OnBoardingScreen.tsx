import { StyleSheet, Text, View, NativeSyntheticEvent, NativeScrollEvent, FlatList, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useColor } from "@/providers/ThemeContext";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { OnBoarding } from "@/components/shared/OnBoarding";
import { StatusBar } from "expo-status-bar";

type OnboardingItem = {
	id: number;
	title: string;
	icon: number;
	text: string;
	isLottie: boolean;
};

export default function OnBoardingScreen(): JSX.Element {
	const { t } = useTranslation();
	const [steps, setSteps] = useState(0);
	const flatListRef = useRef<FlatList>(null);
	const router = useRouter();
	const { secondaryColor, bgColor, isDarkModeOn } = useColor();

	const handleNextSteps = async (): Promise<void> => {
		if (steps < DATA_ON_BOARDING.length - 1) {
			const newStep = steps + 1;
			setSteps(newStep);
			flatListRef.current?.scrollToIndex({ index: newStep, animated: true });
		} else {
			await handleEndOnboarding();
		}
	};

	const handleEndOnboarding = async (): Promise<void> => {
		router.push("/(tabs)");
		await AsyncStorage.setItem("onBoardingSteps", "3");
	};

	const handleJumpSteps = (step: number): void => {
		flatListRef.current?.scrollToIndex({ index: step, animated: true });
		setSteps(step);
	};

	const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const layoutWidth = event.nativeEvent.layoutMeasurement.width;
		const newIndex = Math.round(offsetX / layoutWidth);
		setSteps(newIndex);
	};

	const DATA_ON_BOARDING: OnboardingItem[] = [
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

	return (
		<>
			<StatusBar style={isDarkModeOn ? "light" : "dark"} backgroundColor={bgColor} />
			<View style={[styles.container, { backgroundColor: bgColor }]}>
				<FlatList
					ref={flatListRef}
					horizontal
					pagingEnabled
					data={DATA_ON_BOARDING}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <OnBoarding title={item.title} text={item.text} icon={item.icon} isLottie={item.isLottie} />}
					keyExtractor={(_, index) => index.toString()}
					onMomentumScrollEnd={handleScrollEnd}
				/>
				<View style={styles.dotsContainer}>
					{DATA_ON_BOARDING.map((item, index) => (
						<Pressable
							key={item.id}
							onPress={() => handleJumpSteps(index)}
							style={[styles.dot, { backgroundColor: index === steps ? secondaryColor : "#ccc" }]}
						/>
					))}
				</View>
				<Pressable style={[styles.button, { backgroundColor: secondaryColor }]} onPress={handleNextSteps}>
					<Text style={styles.buttonText}>
						{steps === DATA_ON_BOARDING.length - 1 ? t("onBoarding.end") : t("onBoarding.next")}
					</Text>
				</Pressable>
			</View>
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
	buttonText: {
		color: "#ffff",
	},
});
