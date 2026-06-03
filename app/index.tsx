import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Loading } from "@/components/ui/Loading";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen(): JSX.Element {
	const router = useRouter();
	const { bgColor, isDarkModeOn } = useColor();

	useEffect(() => {
		const getFirstLaunch = async (): Promise<void> => {
			try {
				const onBoardingSteps = await AsyncStorage.getItem("onBoardingSteps");
				if (onBoardingSteps) {
					router.replace("/(tabs)");
				} else {
					router.replace("/OnBoardingScreen");
				}
			} catch (e) {
				console.error(e);
			}
		};
		getFirstLaunch();
	}, [router]);

	return (
		<>
			<StatusBar style={isDarkModeOn ? "light" : "dark"} />
			<Loading />
		</>
	);
}
