import { Action } from ".";

export type confirmDialogState = {
  show: boolean,
  msg: string,
  command: string,
  payload: any,
}


const confirmDialogReducer = (
    state: confirmDialogState,
    action: Action): confirmDialogState => {
  switch (action.type) {
    case "CONFIRM_DIALOG_SHOW": {
      return {
        ...state,
        ...action.payload,
        show: true,
      };
    }
    case "CONFIRM_DIALOG_HIDE":
      return {
        msg: "",
        show: false,
        command: "",
        payload: null,
      };
    default:
      return state;
  }
};


export {confirmDialogReducer};
export type confirmDialogReducerType = typeof confirmDialogReducer;
