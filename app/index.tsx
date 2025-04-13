import { useEffect } from "react";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";
import { toastConfig } from "@/components/ui/CustomToast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
	const router = useRouter();

	const { bgColor } = useColor();

	useEffect(() => {
		async function getFirstLaunch() {
			try {
				// Check if it is user's first connexion
				const onBoardingSteps = await AsyncStorage.getItem("onBoardingSteps");
				if (onBoardingSteps) {
					router.replace("/(tabs)");
				} else {
					router.replace("/OnBoardingScreen");
				}
			} catch (e) {
				console.error(e);
			}
		}
		getFirstLaunch();
	}, []);

	return (
		<>
			<StatusBar translucent backgroundColor={bgColor} />
			<Loading />
		</>
	);
}
