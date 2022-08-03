import { Action } from ".";

export type workDaysState = {
  days : Array<IWorkDay>;
  lastId: number;
  selected: number;
}

interface IWorkDay {
  id: number;
  start: Date;
}

const workDaysReducer = (
    state: workDaysState,
    action: Action): workDaysState => {
  switch (action.type) {
    case "ADD_WORK_DAY": {
      const id = state.lastId + 1;
      const day = action.payload;
      day.id = id;
      return {
        ...state,
        lastId: id,
        days: [...state.days, day],
        selected: id,
      };
    }

    case "CLEAR_WORK_DAYS": {
      console.log('clear work days');
      return {
        ...state,
        days: [],
        lastId: 0,
        selected: 1,
      };
    }

    case "SELECT_WORK_DAY": {
      console.log("select", action.payload);
      return {
        ...state,
        selected: action.payload,
      };
    }

    default:
      return state;
  }
};


export {workDaysReducer};
export type workDaysReducerType = typeof workDaysReducer;
