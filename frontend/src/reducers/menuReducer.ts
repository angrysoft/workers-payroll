import { Action } from ".";

export type menuState = {
  open: boolean,
}


const menuReducer = (
    state: menuState,
    action: Action): menuState => {
  switch (action.type) {
    case "MENU_OPEN":
      return {
        ...state,
        open: true,
      };
    case "MENU_CLOSE":
      return {
        ...state,
        open: false,
      };
    
    case "MENU_TOGGLE":
      return {
        ...state,
        open: ! state.open,
      };
    default:
      return state;
  }
};


export {menuReducer};
export type menuReducerType = typeof menuReducer;
