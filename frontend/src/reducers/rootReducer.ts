import {userReducer, userState} from "./userReducer";
import {tableReducer, tableState} from "./tableReducer";
import { Action } from ".";
import { dialogErrorState, dialogReducer } from "./dialogReducer";

export type RootState = {
  users: userState,
  table: tableState,
  dialog: dialogErrorState,
}

export type State = userState | tableState | dialogErrorState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    const newState = {...state};
    newState["users"] = userReducer(state["users"], action);
    newState["table"] = tableReducer(state["table"], action);
    newState["dialog"] = dialogReducer(state["dialog"], action);
    return newState;
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;
