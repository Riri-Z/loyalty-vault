import { CardContext } from "@/providers/CardContext";
import { useColor } from "@/providers/ThemeContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchCard() {
	const { handleSearch, searchValue, handleClearSearchValue } = useContext(CardContext);
	const { cardColor, textColor, danger } = useColor();
	const { t } = useTranslation();

	return (
		<View style={[styles.containerInput, { backgroundColor: cardColor }]}>
			<Ionicons style={styles.icon} name="search" size={20} color={textColor} />
			<TextInput
				style={[styles.textInput, { color: textColor }]}
				placeholder={t("cards.searchInput.placeHolderName")}
				placeholderTextColor={textColor}
				value={searchValue ?? ""}
				onChangeText={handleSearch}
			/>
			{searchValue && searchValue.length > 0 && (
				<Entypo
					style={styles.delete}
					name="circle-with-cross"
					size={20}
					color={danger}
					onPress={handleClearSearchValue}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	containerInput: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
	},
	icon: {
		marginRight: 8,
	},
	delete: {
		marginLeft: "auto",
	},
	textInput: {
		height: 40,
		flex: 1,
	},
});
