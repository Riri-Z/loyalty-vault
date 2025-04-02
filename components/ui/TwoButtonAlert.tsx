import { Alert } from "react-native";

type Props = {
	title: string;
	content: string;
	textCancel?: string;
	textOk?: string;
	handleOk: any;
	cancelable?: boolean;
};
export default function TwoButtonAlert({
	title = "",
	content = "",
	textCancel = "Cancel",
	textOk = "OK",
	handleOk,
	cancelable = true,
}: Props) {
	return Alert.alert(
		title,
		content,
		[
			{
				text: textCancel,
				style: "cancel",
			},
			{ text: textOk, onPress: handleOk },
		],
		{
			cancelable: cancelable,
		},
	);
}
