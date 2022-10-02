
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

const ModuleContext = createContext<{
  state: ModulesBotModel[];
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
  | Action<"REMOVE_MODULE", { id: string }>;

const reducer: Reducer<ModulesBotModel[], Actions> = (state, action): ModulesBotModel[] => {
  switch (action.type) {
    case "ADD_MODULES": {
      return [
        ...action.payload.data
      ];
    }
    case "ADD_MODULE": {
      return [
        ...state,
        { ...action.payload.data, _id: uuid() }
      ];
    }
    case "REMOVE_MODULE": {
      return [
        ...state.filter(item => item._id !== action.payload.id)
      ];
    }
  }
};

export const ModuleStateProvider = ({ children }: ScriptProps) => {
  const [state, dispatch] = useReducer(reducer, []);
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
