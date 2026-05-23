import { Alert } from "react-native";

type Props = {
	title: string;
	content: string;
	textCancel?: string;
	textOk?: string;
	handleOk: () => void;
	cancelable?: boolean;
};

export const TwoButtonAlert = ({
	title = "",
	content = "",
	textCancel = "Cancel",
	textOk = "OK",
	handleOk,
	cancelable = true,
}: Props): void => {
	Alert.alert(
		title,
		content,
		[
			{
				text: textCancel,
				style: "cancel",
			},
			{ text: textOk, onPress: handleOk },
		],
		{ cancelable },
	);
};
