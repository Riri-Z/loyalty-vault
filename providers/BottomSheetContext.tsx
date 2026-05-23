import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Keyboard } from "react-native";

type Action = {
	label: string;
	callback: () => void;
};

type BottomSheetContextType = {
	isVisible: boolean;
	actions: Action[];
	handleDisplayBottomSheet: (value: boolean) => void;
	handleUpdateActions: (actions: Action[]) => void;
	handleCloseBottomSheet: () => void;
};

export const BottomSheetContext = createContext<BottomSheetContextType>({} as BottomSheetContextType);

type BottomSheetProviderProps = {
	children: ReactNode;
};

export const BottomSheetProvider = ({ children }: BottomSheetProviderProps): JSX.Element => {
	const [isVisible, setIsVisible] = useState(false);
	const [actions, setActions] = useState<Action[]>([]);

	const handleCloseBottomSheet = (): void => {
		setIsVisible(false);
		setActions([]);
	};

	useEffect(() => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss();
		}
	}, [isVisible]);

	const handleDisplayBottomSheet = (value: boolean): void => {
		setIsVisible(value);
	};

	const handleUpdateActions = (newActions: Action[]): void => {
		setActions(newActions);
		setIsVisible(true);
	};

	const values = useMemo(
		() => ({
			actions,
			isVisible,
			handleDisplayBottomSheet,
			handleUpdateActions,
			handleCloseBottomSheet,
		}),
		[actions, isVisible],
	);

	return <BottomSheetContext.Provider value={values}>{children}</BottomSheetContext.Provider>;
};
