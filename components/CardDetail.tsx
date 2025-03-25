import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ImageViewer from "@/components/ImageViewer";

type Props = PropsWithChildren<{
	isVisible: boolean;
	src: string;
	name: string;
	onClose: () => void;
}>;

export default function CardDetail({ isVisible, src, name, children, onClose }: Props) {
	return (
		<View>
			<Modal animationType="slide" transparent={true} visible={isVisible}>
				<View style={styles.modalContent}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{name}</Text>
						<Pressable onPress={onClose}>
							<MaterialIcons name="close" color="#fff" size={22} />
						</Pressable>
					</View>
					{children}

					<ImageViewer imgSource={src} />
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContent: {
		height: "100%",
		width: "100%",
		backgroundColor: "#ffffff",
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
	},
	titleContainer: {
		height: "5%",
		backgroundColor: "#464C55",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		color: "#fff",
		fontSize: 16,
	},
});
