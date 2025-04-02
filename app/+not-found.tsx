import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Ooops , not found ! " }} />
			<View>
				<Link href="/(tabs)/settings">Go back to home screen !</Link>
			</View>
		</>
	);
}
