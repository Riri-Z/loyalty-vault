import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { deleteOneCard } from "@/providers/useDatabase";
import useColor from "@/hooks/useColor";
import CardContainer from "./ui/CardContainer";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TwoButtonAlert from "./ui/TwoButtonAlert";

type Props = {
	id: number;
	name: string;
	uri: string;
	openCardDetail: () => void;
};
export default function CardsInformation({ id, name, uri, openCardDetail }: Props) {
	const { t } = useTranslation();
	const { textColor, bgColor } = useColor();

	async function handleDeleteFile() {
		try {
			await deleteOneCard(+id);
			// Optional: Add success handling
		} catch (error) {
			console.error("Delete failed", error);
		}
	}

	async function handleopenAlertdelete() {
		return TwoButtonAlert({
			title: t("cards.deleteAlert.title"),
			content: name,
			textCancel: t("cards.deleteAlert.cancel"),
			textOk: t("cards.deleteAlert.ok"),
			handleOk: handleDeleteFile,
		});
	}

	return (
		<CardContainer>
			<Pressable onPress={handleopenAlertdelete} style={[styles.ctaDelete]}>
				<MaterialIcons
					name={bgColor === "#181818" ? "delete" : "delete-forever"}
					size={34}
					color={bgColor === "#181818" ? "#FF6B6B" : "red"}></MaterialIcons>
			</Pressable>
			<Pressable style={{ gap: 20 }} onPress={openCardDetail}>
				<View style={{ gap: 10 }}>
					<View style={styles.container}>
						<Text style={[styles.labelText, { color: textColor }]}>{t("cards.name")}</Text>
						<Text style={{ color: textColor }}>
							{name.slice(0, 1).toUpperCase() + name.slice(1)}
						</Text>
					</View>
				</View>
				{/* Preview */}
				<View style={styles.container}>
					<Text style={[styles.labelText, { color: textColor }]}>Apercu</Text>
					<Image style={styles.image} source={uri} contentFit="cover" transition={1000} />
				</View>
				{/* Path */}
				<View style={styles.container}>
					<Text style={[styles.labelText, { color: textColor }]}>{t("cards.uri")}</Text>
					<Text style={[styles.uriText, { color: textColor }]}>{uri}</Text>
				</View>
			</Pressable>
		</CardContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 10,
	},
	labelText: {
		minWidth: 50,
		fontWeight: "bold",
	},
	uriText: {
		flex: 1,
	},
	image: {
		flex: 1,
		height: 200,
		borderRadius: 15,
		width: "100%",
		backgroundColor: "#0553",
	},
	content: {},
	ctaDelete: {
		position: "absolute",
		right: 10,
		top: 10,
		width: 50,
		height: 50,
		alignItems: "center",
		zIndex: 1,
	},
});
