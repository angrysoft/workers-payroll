import {userReducer, userState} from "./userReducer";
import {tableReducer, tableState} from "./tableReducer";
import { Action } from ".";

export type RootState = {
  users: userState,
  table: tableState,
}

export type State = userState | tableState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    const newState = {...state};
    newState["users"] = userReducer(state["users"], action);
    newState["table"] = tableReducer(state["table"], action);
    return newState;
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;
