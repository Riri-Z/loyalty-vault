import { Button, Pressable, Text, View } from "react-native";
import { deleteOneCard } from "@/providers/useDatabase";
import useColor from "@/hooks/useColor";
import CardContainer from "./ui/CardContainer";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";

type Props = {
	id: number;
	name: string;
	uri: string;
	openCardDetail: () => void;
};
export default function CardsInformation({ id, name, uri, openCardDetail }: Props) {
	const { t } = useTranslation();
	const { color } = useColor();

	async function handleDeleteFile() {
		await deleteOneCard(+id);
	}

	return (
		<CardContainer>
			<Pressable style={{ gap: 20 }} onPress={openCardDetail}>
				{/* Name */}
				<View style={{ gap: 10 }}>
					<View style={{ flexDirection: "row", gap: 10 }}>
						<Text style={{ minWidth: 50, color, fontWeight: "bold" }}>{t("cards.name")}</Text>
						<Text style={{ color }}>{name}</Text>
					</View>
				</View>
				{/* Preview */}
				<View style={{ flexDirection: "row", gap: 10 }}>
					<Text style={{ minWidth: 50, color, fontWeight: "bold" }}>Apercu</Text>
					<Image
						style={{
							flex: 1,
							height: 200,
							borderRadius: 15,
							width: "100%",
							backgroundColor: "#0553",
						}}
						source={uri}
						contentFit="cover"
						transition={1000}
					/>
				</View>
				{/* Path */}
				<View style={{ flexDirection: "row", gap: 10 }}>
					<Text style={{ minWidth: 50, color, fontWeight: "bold" }}>{t("cards.uri")}</Text>
					<Text style={{ flex: 1, color }}>{uri}</Text>
				</View>
				{/* CTA */}
				<View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly" }}>
					<Button title="Ouvrir" onPress={openCardDetail} accessibilityLabel="Open file" />
					<Button
						title="Suppprimer"
						onPress={handleDeleteFile}
						color="#FF0000"
						accessibilityLabel="delete file"
					/>
				</View>
			</Pressable>
		</CardContainer>
	);
}
