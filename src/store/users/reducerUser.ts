import { UPDATE_NAME, UPDATE_LASTNAME, UPDATE_AGE } from "./actionTypes";

export function reduceUser(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_LASTNAME:
      return { ...state, lastName: payload };
    case UPDATE_AGE:
      return { ...state, age: payload };
    default:
      return state;
  }
}