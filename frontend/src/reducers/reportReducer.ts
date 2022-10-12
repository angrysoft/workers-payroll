import { Action } from ".";

export type reportState = {
  year: string,
  month: string,
}


const reportReducer = (
    state: reportState,
    action: Action): reportState => {
  switch (action.type) {
    case "CHANGE_REPORT_DATE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};


export {reportReducer};
export type reportReducerType = typeof reportReducer;
