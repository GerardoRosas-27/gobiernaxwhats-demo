
import { ChatBotModel } from "@models/chat-bot.model";
import { ScriptProps } from "next/script";
import {
    createContext,
    Reducer,
    useContext,
    Dispatch,
    useReducer,
} from "react";
import { v4 as uuid } from "uuid";

export interface IChatState {
    list: ChatBotModel[],
    select: ChatBotModel
}
export const initialState = {
    select: {
        _id: '',
        type: '',
        text: { body: '' }
    } as ChatBotModel,
    list: [] as ChatBotModel[],
};

const ChatContext = createContext<{
    state: IChatState
    dispatch: Dispatch<Actions>;
}>(undefined!);


type Action<T extends string, payload> = payload extends undefined
    ? {
        type: T;
    }
    : {
        type: T;
        payload: payload;
    };
type Actions =
    | Action<"ADD_CHATS", { data: ChatBotModel[] }>
    | Action<"ADD_CHAT", { data: ChatBotModel }>
    | Action<"SELECT_CHAT", { data: ChatBotModel }>
    | Action<"REMOVE_CHAT", { id: string }>;

const reducer: Reducer<IChatState, Actions> = (state, action): IChatState => {
    switch (action.type) {
        case "ADD_CHATS": {
            return {
                ...state,
                list: action.payload.data
            }
        }
        case "ADD_CHAT": {
            const dataChat = [...state.list, { ...action.payload.data, id: uuid() }];
            return {
                ...state,
                list: dataChat
            }
        }
        case "SELECT_CHAT": {
            return {
                ...state,
                select: action.payload.data
            }
        }
        case "REMOVE_CHAT": {
            return {
                ...state,
                list: [...state.list.filter(item => item._id !== action.payload.id)]
            };
        }
    }
};

export const ChatStateProvider = ({ children }: ScriptProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("state: ", state)

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChatState = () => {
    return useContext(ChatContext);
};
