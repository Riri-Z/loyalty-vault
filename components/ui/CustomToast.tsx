import React, { useState } from "react";
import {
	View,
	Button,
	Text,
	StyleSheet,
	ScrollView,
	Switch,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";

type Props = {
	text1: string;
	text2: string;
};
// Custom toast configuration
const toastConfig = {
	success: (props: Props) => (
		<View style={styles.customSuccessToast}>
			<Icon name="check-circle" size={24} color="#fff" />
			<View style={styles.textContainer}>
				<Text style={styles.customTitle}>{props.text1}</Text>
				{props.text2 && <Text style={styles.customMessage}>{props.text2}</Text>}
			</View>
		</View>
	),
	error: (props: Props) => (
		<View style={styles.customErrorToast}>
			<Entypo name="circle-with-cross" size={24} color="#fff" />
			<View style={styles.textContainer}>
				<Text style={styles.customTitle}>{props.text1}</Text>
				{props.text2 && <Text style={styles.customMessage}>{props.text2}</Text>}
			</View>
		</View>
	),
	// Override other toast types as needed
};

export { toastConfig };

const styles = StyleSheet.create({
	textContainer: {
		flex: 1,
		marginLeft: 10,
	},
	customTitle: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	customMessage: {
		color: "#fff",
		fontSize: 14,
		marginTop: 4,
	},
	customSuccessToast: {
		width: "90%",
		backgroundColor: "#4db34d	",
		borderRadius: 10,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	customErrorToast: {
		width: "90%",
		backgroundColor: "#ff3333",
		borderRadius: 10,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
