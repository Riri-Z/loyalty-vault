import { createContext, ReactNode, useMemo, useState } from "react";

type BottomSheetContextType = {
	isVisible: boolean;
	actions: Action[];
	handleDisplayBottomSheet: (value: boolean) => void;
	handleUpdateActions: (actions: Action[]) => void;
	handleCloseBottomSheet: () => void;
};
type Action = {
	label: string;
	callback: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({} as BottomSheetContextType);

const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [actions, setActions] = useState<Action[]>([]);

	const handleCloseBottomSheet = () => {
		setIsVisible(false);
		// Reset actions
		setActions([]);
	};

	const handleDisplayBottomSheet = (value: boolean) => {
		setIsVisible(value);
	};

	const handleUpdateActions = (actions: Action[]) => {
		setActions(actions);
		setIsVisible(true);
	};
	const values = useMemo(() => {
		return {
			actions,
			isVisible,
			handleDisplayBottomSheet,
			handleUpdateActions,
			handleCloseBottomSheet,
		};
	}, [actions, isVisible]);

	return <BottomSheetContext.Provider value={values}>{children}</BottomSheetContext.Provider>;
};

export { BottomSheetContext, BottomSheetProvider };
