import { Action } from ".";

export type workDaysState = {
  days : Array<IWorkDay>;
}

interface IWorkDay {
  id: String;
  start: Date;
}

const workDaysReducer = (
    state: workDaysState,
    action: Action): workDaysState => {
  switch (action.type) {
    case "ADD_WORK_DAY": {
      console.log(state, action.payload);
      const newState = {...state};
      newState.days.push(action.payload);
      return newState;
    }

    case "CLEAR_WORK_DAYS": {
      console.log('clear work days');
      const newState = {...state};
      newState.days = [];
      return newState;
    }

    default:
      return state;
  }
};


export {workDaysReducer};
export type workDaysReducerType = typeof workDaysReducer;
