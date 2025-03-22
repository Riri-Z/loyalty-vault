import { Cards } from "@/types/Cards";
import { createContext, useReducer, ReactNode } from "react";

const CardsContext = createContext([]);
const CardDispatchContext = createContext<React.Dispatch<any>>(() => null);

function CardsProvider({ children }: { children: ReactNode }) {
	const [cards, dispatch] = useReducer(cardsReducer, initialCards);
	return (
		<CardsContext.Provider value={cards}>
			<CardDispatchContext.Provider value={dispatch}>{children}</CardDispatchContext.Provider>
		</CardsContext.Provider>
	);
}

function cardsReducer({ cards, action }: any) {
	switch (action.type) {
		case "add": {
			return [
				...cards,
				{
					id: action.id,
					name: action.name,
					uri: action.uri,
				},
			];
		}
		case "delete": {
			return cards.filter((e: Cards) => e.id !== action.id);
		}
		default: {
			throw Error("unknonw action : " + action.type);
		}
	}
}

//TODO : EMPTY ARRAY AT START
const initialCards = [
	{
		id: 4,
		name: "test",
		uri: "file:///data/user/0/com.zeto.LoyaltyVault/cache/ImagePicker/5f820bcc-d7f5-4e5b-af3a-b92783ec0b2f.jpeg",
	},
	{
		id: 5,
		name: "dzqodzqdz",
		uri: "file:///data/user/0/com.zeto.LoyaltyVault/cache/ImagePicker/5f820bcc-d7f5-4e5b-af3a-b92783ec0b2f.jpeg",
	},
	{
		id: 7,
		name: "toto",
		uri: "file:///data/user/0/com.zeto.LoyaltyVault/cache/ImagePicker/5f820bcc-d7f5-4e5b-af3a-b92783ec0b2f.jpeg",
	},
];

export { CardsProvider, CardsContext, CardDispatchContext };
