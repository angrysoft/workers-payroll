import { Action } from ".";

export type dialogErrorState = {
  show: boolean,
  msg: string,
  backTo: string,
}


const dialogReducer = (
    state: dialogErrorState,
    action: Action): dialogErrorState => {
  switch (action.type) {
    case "ERROR_DIALOG_SHOW":
      const newState = {...state};
      newState.msg = action.payload.msg;
      newState.show = action.payload.show;
      newState.backTo = action.payload.backTo;
      return newState;
    case "ERROR_DIALOG_CLOSE":
      return {
        msg: "",
        show: false,
        backTo: "",
      };
    default:
      return state;
  }
};


export {dialogReducer};
export type dialogReducerType = typeof dialogReducer;
