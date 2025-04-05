import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingsScreen() {
	const [theme, setTheme] = useState("light");
	const currentLanguage = "English";

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const openLanguageModal = () => {
		
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Settings</Text>

			{/* Section Personalisation */}
			<Text style={styles.sectionTitle}>Personalisation</Text>
			<View style={styles.itemContainer}>
				<TouchableOpacity onPress={openLanguageModal} style={styles.itemRow}>
					<Text style={styles.itemLabel}>Language</Text>
					<Text style={styles.itemValue}>{currentLanguage}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.itemContainer}>
				<View style={styles.itemRow}>
					<Text style={styles.itemLabel}>Appearance</Text>
					<Switch value={theme === "dark"} onValueChange={toggleTheme} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#1A1A1A", 
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		color: "#ddd",
		marginVertical: 8,
	},
	itemContainer: {
		backgroundColor: "#2A2A2A",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemLabel: {
		fontSize: 16,
		color: "#fff",
	},
	itemValue: {
		fontSize: 16,
		color: "#888", 
	},
});
