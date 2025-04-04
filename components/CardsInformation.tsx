import { Pressable, StyleSheet, Text, View } from "react-native";
import { deleteOneCard } from "@/providers/useDatabase";
import CardContainer from "./ui/CardContainer";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import TwoButtonAlert from "./ui/TwoButtonAlert";
import { router } from "expo-router";
import { useColor } from "@/providers/ThemeProvider";

type Props = {
	id: number;
	name: string;
	uri: string;
	openCardDetail: () => void;
};
export default function CardsInformation({ id, name, uri, openCardDetail }: Props) {
	const { t } = useTranslation();
	const { textColor, secondaryColor } = useColor();

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

	function handleEditCard() {
		return router.push({
			pathname: "/addCardModal",
			params: {
				nameCard: name,
				fileCard: uri,
				idCard: id.toString(),
			},
		});
	}

	return (
		<CardContainer>
			<View style={[styles.ctaDelete]}>
				<Pressable
					style={[styles.editButton, { backgroundColor: secondaryColor }]} // edit button
					onPress={handleEditCard}>
					<Text style={[styles.textButton]}>Edisst</Text>
				</Pressable>
				<Pressable onPress={handleopenAlertdelete}>
					<Entypo name="circle-with-cross" size={24} color="red" />
				</Pressable>
			</View>
			<Pressable style={styles.container} onPress={openCardDetail}>
				<View style={styles.container}>
					<Text style={[styles.labelText, { color: textColor }]}>{t("cards.name")}</Text>
					<Text style={[styles.content, { color: textColor }]}>
						{name.slice(0, 1).toUpperCase() + name.slice(1)}
					</Text>
				</View>

				{/* Preview */}
				<View style={styles.container}>
					<Text style={[styles.labelText, { color: textColor }]}>{t("cards.preview")}</Text>
					<Image style={styles.image} source={uri} contentFit="cover" transition={1000} />
				</View>
				<Text style={[styles.textButton, { color: textColor, marginVertical: 10 }]}>
					{t("cards.cta.tapToView")}
				</Text>
			</Pressable>
		</CardContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		gap: 10,
	},
	labelText: {
		minWidth: 50,
		fontWeight: 600,
		fontSize: 16,
	},
	content: { paddingLeft: 10 },
	uriText: {
		flex: 1,
		fontSize: 14,
	},
	image: {
		flex: 1,
		height: 200,
		borderRadius: 8,
		marginVertical: 8,
		width: "100%",
		backgroundColor: "#0553",
	},
	ctaDelete: {
		position: "absolute",
		display: "flex",
		flexDirection: "row",
		right: 10,
		top: 2,
		width: 75,
		justifyContent: "space-between",
		height: 50,
		alignItems: "center",
		zIndex: 1,
		gap: 5,
	},
	editButton: {
		borderRadius: 99999,
		width: 50,
		borderColor: "white",
	},
	textButton: { alignSelf: "center", fontSize: 14, fontWeight: "bold", color: "white" },
});
