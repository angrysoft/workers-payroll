import { Action } from ".";

export type tableState = {
  selected: string,
}


const tableReducer = (state: tableState, action: Action): tableState => {
  switch (action.type) {
    case "RESET_TABLE_SELECTION":
      return {selected: ""};
    case "SET_TABLE_SELECTION":
      return {selected: action.payload};
    default:
      return state;
  }
};


export {tableReducer};
export type tableReducerType = typeof tableReducer;
