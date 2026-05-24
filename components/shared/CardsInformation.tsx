import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { TwoButtonAlert } from "@/components/ui/TwoButtonAlert";
import { router } from "expo-router";
import { useColor } from "@/providers/ThemeContext";
import { useContext } from "react";
import { CardContext } from "@/providers/CardContext";
import Toast from "react-native-toast-message";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { StoreLogo } from "./StoreLogo";
import { getStoreById } from "@/services/storesDatabase";

type Props = {
	id: number;
	name: string;
	fileUri: string;
	storeId: number | null;
	cardNumber: string | null;
	openCardDetail: () => void;
};

export const CardsInformation = ({
	id,
	name,
	fileUri,
	storeId,
	cardNumber,
	openCardDetail,
}: Props): JSX.Element => {
	const { t } = useTranslation();
	const { deleteCard } = useContext(CardContext);
	const { textColor, secondaryColor, danger, cardColor } = useColor();

	const store = storeId ? getStoreById(storeId) : null;

	const displayName = store ? store.name : name.slice(0, 1).toUpperCase() + name.slice(1);

	const maskedNumber = (() => {
		if (!cardNumber) return null;
		const digits = cardNumber.replace(/\s/g, "");
		if (digits.length <= 8) return cardNumber;
		const visible = digits.slice(-8);
		const masked = "•••• •••• ";
		return masked + visible.replace(/(.{4})/g, "$1 ").trim();
	})();

	const handleDeleteFile = async (): Promise<void> => {
		try {
			const res = await deleteCard(id);
			if (res.success) {
				Toast.show({ type: "success", text1: t("cards.deleteAlert.success") });
			} else {
				Toast.show({ type: "error", text1: t("cards.deleteAlert.failed") });
			}
		} catch (error) {
			console.error("Delete failed", error);
		}
	};

	const handleOpenAlertDelete = async (): Promise<void> => {
		return TwoButtonAlert({
			title: t("cards.deleteAlert.title"),
			content: displayName,
			textCancel: t("cards.deleteAlert.cancel"),
			textOk: t("cards.deleteAlert.ok"),
			handleOk: handleDeleteFile,
		});
	};

	const handleEditCard = (): void => {
		router.push({
			pathname: "/addCardModal",
			params: {
				nameCard: name,
				fileCard: fileUri,
				idCard: id.toString(),
				storeIdCard: storeId?.toString() || "",
				cardNumberCard: cardNumber || "",
			},
		});
	};

	return (
		<Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
			<Pressable
				style={[styles.card, { backgroundColor: cardColor }]}
				onPress={openCardDetail}
				onLongPress={handleOpenAlertDelete}>
				<View style={styles.row}>
					<StoreLogo storeId={storeId} size={48} />
					<View style={styles.info}>
						<Text style={[styles.storeName, { color: textColor }]} numberOfLines={1}>
							{displayName}
						</Text>
						{maskedNumber ? (
							<Text style={styles.cardNumber}>{maskedNumber}</Text>
						) : cardNumber ? (
							<Text style={styles.cardNumber}>{cardNumber}</Text>
						) : null}
						{!store && (
							<Text style={styles.customLabel} numberOfLines={1}>
								{name.slice(0, 1).toUpperCase() + name.slice(1)}
							</Text>
						)}
					</View>
					<View style={styles.actions}>
						<Pressable
							onPress={handleEditCard}
							style={[styles.editBtn, { backgroundColor: secondaryColor }]}>
							<MaterialIcons name="edit" size={14} color="#fff" />
						</Pressable>
						<View style={{ width: 4 }} />
						<Pressable onPress={handleOpenAlertDelete}>
							<Entypo name="circle-with-cross" size={22} color={danger} />
						</Pressable>
					</View>
				</View>
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 14,
		padding: 14,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	info: {
		flex: 1,
		gap: 3,
	},
	storeName: {
		fontSize: 15,
		fontWeight: "600",
	},
	cardNumber: {
		fontSize: 13,
		color: "#888",
		letterSpacing: 0.5,
	},
	customLabel: {
		fontSize: 12,
		color: "#999",
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	editBtn: {
		width: 28,
		height: 28,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
	},
});
