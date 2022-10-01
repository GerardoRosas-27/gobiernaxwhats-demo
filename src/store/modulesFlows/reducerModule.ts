import { ModulesBotInterface } from "@interfaces/modules.interface";
import { UPDATE_MODULES } from "./actionTypes";

export interface IActio {
  type: string;
  payload: {
    name: string;
    value: string;
  };
}

export function reduceModule(state: ModulesBotInterface, action: IActio) {
  const { type, payload } = action;
  const {name} = payload
  switch (type) {
    case UPDATE_MODULES:
      return { ...state, [name]: payload.value };
    
  }
}