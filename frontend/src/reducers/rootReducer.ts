import {userReducer, userState} from "./userReducer";
import {tableReducer, tableState} from "./tableReducer";
import { Action } from ".";
import { dialogErrorState, dialogReducer } from "./dialogReducer";
import { workDaysReducer, workDaysState } from "./workDaysReducer";

export type RootState = {
  users: userState,
  table: tableState,
  dialog: dialogErrorState,
  workDays: workDaysState,
}

export type State = userState | tableState | dialogErrorState | workDaysState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    const newState = {...state};
    newState["users"] = userReducer(state["users"], action);
    newState["table"] = tableReducer(state["table"], action);
    newState["dialog"] = dialogReducer(state["dialog"], action);
    newState["workDays"] = workDaysReducer(state["workDays"], action);
    return newState;
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;
