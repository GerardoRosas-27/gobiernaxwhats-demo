import { UPDATE_NAME, UPDATE_LASTNAME, UPDATE_AGE } from "./actionTypes";

export const updateName = (name: string) => ({ type: UPDATE_NAME, payload: name });

export const updateLastName = (lastName: string) => ({
  type: UPDATE_LASTNAME,
  payload: lastName
});

export const updateAge = (age: number) => ({ type: UPDATE_AGE, payload: age });