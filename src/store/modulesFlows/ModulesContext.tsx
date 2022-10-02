
import { ModulesBotModel } from "@models/modules-bot.model";
import { ScriptProps } from "next/script";
import {
  createContext,
  Reducer,
  useContext,
  Dispatch,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";

export interface IModuleState {
  list: ModulesBotModel[],
  select: ModulesBotModel
}
export const initialState = {
  select: { _id: "", name: "", principal: false } as ModulesBotModel,
  list: [] as ModulesBotModel[],
};

const ModuleContext = createContext<{
  state: IModuleState
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
  | Action<"ADD_MODULES", { data: ModulesBotModel[] }>
  | Action<"ADD_MODULE", { data: ModulesBotModel }>
  | Action<"SELECT_MODULE", { data: ModulesBotModel }>
  | Action<"REMOVE_MODULE", { id: string }>;

const reducer: Reducer<IModuleState, Actions> = (state, action): IModuleState => {
  switch (action.type) {
    case "ADD_MODULES": {
      return {
        ...state,
        list: action.payload.data
      }
    }
    case "ADD_MODULE": {
      const dataModule = [...state.list, { ...action.payload.data, id: uuid() }];
      return {
        ...state,
        list: dataModule
      }
    }
    case "SELECT_MODULE": {
      return {
        ...state,
        select: action.payload.data 
      }
    }
    case "REMOVE_MODULE": {
      return {
        ...state,
        list: [...state.list.filter(item => item._id !== action.payload.id)]
      };
    }
  }
};

export const ModuleStateProvider = ({ children }: ScriptProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state: ", state)

  return (
    <ModuleContext.Provider value={{ state, dispatch }}>
      {children}
    </ModuleContext.Provider>
  );
}

export const useModuleState = () => {
  return useContext(ModuleContext);
};
