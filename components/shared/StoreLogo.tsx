import { View, StyleSheet, Text } from "react-native";
import {
	MaterialIcons,
	Ionicons,
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Store, getStoreById } from "@/services/storesDatabase";

type Props = {
	storeId: number | null;
	size?: number;
};

const IconFamilies = {
	MaterialIcons,
	Ionicons,
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} as const;

const DEFAULT_BG = "#555";
const DEFAULT_ICON = "store";
const DEFAULT_FAMILY = "MaterialIcons" as const;
const DEFAULT_COLOR = "#fff";

export const StoreLogo = ({ storeId, size = 44 }: Props): JSX.Element => {
	const store: Store | undefined = storeId ? getStoreById(storeId) : undefined;

	const bg = store?.backgroundColor || DEFAULT_BG;
	const iconName = store?.iconName || DEFAULT_ICON;
	const iconFamily = store?.iconFamily || DEFAULT_FAMILY;
	const iconColor = store?.iconColor || DEFAULT_COLOR;
	const letter = store?.name?.charAt(0).toUpperCase();

	const IconComponent = IconFamilies[iconFamily] || MaterialIcons;
	const iconSize = Math.round(size * 0.5);

	if (!store) {
		return (
			<View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: DEFAULT_BG }]}>
				<Text style={[styles.letter, { fontSize: size * 0.4 }]}>?</Text>
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
			]}>
			{iconFamily === "MaterialIcons" ||
			iconFamily === "MaterialCommunityIcons" ? (
				<MaterialIcons
					name={iconName as keyof typeof MaterialIcons.glyphMap}
					size={iconSize}
					color={iconColor}
				/>
			) : iconFamily === "Ionicons" ? (
				<Ionicons
					name={iconName as keyof typeof Ionicons.glyphMap}
					size={iconSize}
					color={iconColor}
				/>
			) : iconFamily === "FontAwesome" ? (
				<FontAwesome
					name={iconName as keyof typeof FontAwesome.glyphMap}
					size={iconSize}
					color={iconColor}
				/>
			) : iconFamily === "FontAwesome5" ? (
				<FontAwesome5
					name={iconName as keyof typeof FontAwesome5.glyphMap}
					size={iconSize}
					color={iconColor}
				/>
			) : (
				<Text style={[styles.letter, { fontSize: size * 0.4, color: iconColor }]}>
					{letter}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	letter: {
		fontWeight: "bold",
		color: "#fff",
	},
});
