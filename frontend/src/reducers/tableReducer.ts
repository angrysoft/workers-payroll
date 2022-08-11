import { Action } from ".";

export type tableState = {
  [key: string]: {selected:string},
}


const tableReducer = (state: tableState, action: Action): tableState => {
  switch (action.type) {
    case "RESET_TABLE_SELECTION": {
      console.log("resettaboe", action.payload);
      const newState: tableState = {...state};
      newState[action.payload.tableId] = {selected: ""};
      return newState;
    }
    case "SET_TABLE_SELECTION": {
      console.log('select');
      const newState: tableState = {...state};
      newState[action.payload.tableId] = {selected: action.payload.selected};
      return newState;
    }
    default:
      return state;
  }
};


export {tableReducer};
export type tableReducerType = typeof tableReducer;
