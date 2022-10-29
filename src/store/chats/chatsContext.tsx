
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
    filter: ChatBotModel[],
    select: ChatBotModel
}
export const initialState = {
    select: {
        _id: '',
        type: '',
        text: { body: '' }
    } as ChatBotModel,
    list: [] as ChatBotModel[],
    filter: [] as ChatBotModel[]
};

const ChatContext = createContext<{
    stateChat: IChatState
    dispatchChat: Dispatch<Actions>;
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
    | Action<"FILTER_CHATS", { data: ChatBotModel[] }>
    | Action<"ADD_CHAT", { data: ChatBotModel }>
    | Action<"SELECT_CHAT", { data: ChatBotModel }>
    | Action<"REMOVE_CHAT", { id: string }>;

const reducer: Reducer<IChatState, Actions> = (state, action): IChatState => {
    switch (action.type) {
        case "ADD_CHATS": {
            return {
                ...state,
                list: action.payload.data,
                filter: action.payload.data
            }
        }
        case "FILTER_CHATS": {
            return {
                ...state,
                filter: action.payload.data
            }
        }
        case "ADD_CHAT": {
            const dataChat = [...state.list, { ...action.payload.data }];
            const filterDataChat = [...state.filter, { ...action.payload.data }];
            return {
                ...state,
                list: dataChat,
                filter: filterDataChat
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
    const [stateChat, dispatchChat] = useReducer(reducer, initialState);
    console.log("state: ", stateChat)

    return (
        <ChatContext.Provider value={{ stateChat, dispatchChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChatState = () => {
    return useContext(ChatContext);
};
