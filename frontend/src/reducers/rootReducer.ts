import {userReducer, userState} from "./userReducer";
import {tableReducer, tableState} from "./tableReducer";
import { Action } from ".";
import { dialogErrorState, dialogReducer } from "./dialogReducer";
import { workDaysReducer, workDaysState } from "./workDaysReducer";
import {confirmDialogReducer, confirmDialogState} from "./confirmDialogReducer";
import { reportReducer, reportState } from "./reportReducer";
import { menuReducer, menuState } from "./menuReducer";

export type RootState = {
  users: userState,
  table: tableState,
  dialog: dialogErrorState,
  workDays: workDaysState,
  confirmDialog: confirmDialogState,
  report: reportState,
  menu: menuState,
}

export type State = userState |
                    tableState |
                    dialogErrorState |
                    workDaysState |
                    reportState |
                    menuState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    return {
      ...state,
      users: userReducer(state["users"], action),
      table: tableReducer(state["table"], action),
      dialog: dialogReducer(state["dialog"], action),
      workDays: workDaysReducer(state["workDays"], action),
      confirmDialog: confirmDialogReducer(state["confirmDialog"], action),
      report: reportReducer(state["report"], action),
      menu: menuReducer(state["menu"], action),
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;
