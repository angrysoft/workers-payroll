import {userReducer, userState} from "./userReducer";
import {tableReducer, tableState} from "./tableReducer";
import { Action } from ".";
import { dialogErrorState, dialogReducer } from "./dialogReducer";
import { workDaysReducer, workDaysState } from "./workDaysReducer";
import { confirmDialogReducer, confirmDialogState } from "./confirmDialogReducer";

export type RootState = {
  users: userState,
  table: tableState,
  dialog: dialogErrorState,
  workDays: workDaysState,
  confirmDialog: confirmDialogState,
}

export type State = userState | tableState | dialogErrorState | workDaysState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    return {
      ...state,
      users: userReducer(state["users"], action),
      table: tableReducer(state["table"], action),
      dialog: dialogReducer(state["dialog"], action),
      workDays: workDaysReducer(state["workDays"], action),
      confirmDialog: confirmDialogReducer(state["confirmDialog"], action),
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;
