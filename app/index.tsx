import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Loading from "@/components/ui/Loading";
import { useColor } from "@/providers/ThemeContext";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";
import { toastConfig } from "@/components/ui/CustomToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
					router.push("/(tabs)");
				} else {
					router.push("/OnBoardingScreen");
				}
			} catch (e) {
				console.error(e);
			}
		}
		getFirstLaunch();
	}, []);

	return (
		<GestureHandlerRootView>
			<StatusBar translucent backgroundColor={bgColor} />
			<Loading />
			<ToastManager
				config={toastConfig}
				visibilityTime={2000}
				showProgressBar={false}
				showCloseIcon={true}
			/>
		</GestureHandlerRootView>
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
