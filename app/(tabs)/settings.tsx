import { View, Text, StyleSheet } from "react-native";
import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import { useTheme } from "@react-navigation/native";

export default function SettingsScreen() {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<View style={styles.options}>
				<Text style={[styles.title, { color: colors.text }]}>Preferences</Text>
				<View style={styles.preferences}>
					<LanguagePicker />
					<ThemePicker />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
	},
	title: {
		paddingLeft: 24,
		fontSize: 32,
	},
	text: {
		color: "#fff",
		paddingLeft: 12,
		fontSize: 16,
	},
	options: {
		flex: 2,
		gap: 4,
	},
	preferences: {
		paddingLeft: 12,
	},
});
