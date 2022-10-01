import { IActio } from "./reducerModule";

export const UPDATE_MODULES = "updateModules";

export const updateModules = (data: IActio) => ({ type: UPDATE_MODULES, payload: data });
