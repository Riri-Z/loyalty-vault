import { useEffect } from "react";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePostHog } from "posthog-react-native";

export default function HomeScreen() {
	const router = useRouter();
	const posthog = usePostHog();
	const { bgColor, isDarkModeOn } = useColor();

	useEffect(() => {
		posthog.capture("Started onboarding");
	}, [posthog]);

	useEffect(() => {
		async function getFirstLaunch() {
			try {
				// Check if it is user's first connexion
				const onBoardingSteps = await AsyncStorage.getItem("onBoardingSteps");
				if (onBoardingSteps) {
					posthog.capture("Navigate to main application");

					router.replace("/(tabs)");
				} else {
					router.replace("/OnBoardingScreen");
				}
			} catch (e) {
				console.error(e);
			}
		}
		getFirstLaunch();
	}, [router, posthog]);

	return (
		<>
			<StatusBar style={isDarkModeOn ? "light" : "dark"} backgroundColor={bgColor} />
			<Loading />
		</>
	);
}
