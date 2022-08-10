import { Action } from ".";
import { User } from "../store/auth";

export type workDaysState = {
  event_id: string;
  event_name: string;
  days : Array<IWorkDay>;
  lastId: number;
  selected: number;
  addDayDialogShow: boolean;
  removeDayDialogShow: boolean;
  dayItemDialogShow: boolean;
}

interface IWorkDay {
  id: number;
  start: Date;
  items: Array<IDayItem>
}

interface IDayItem {
  worker: number;
  start: Date;
  end: Date;
  function: string;
  additions: Array<number>;
}

const workDaysReducer = (
    state: workDaysState,
    action: Action): workDaysState => {
  switch (action.type) {
    case "ADD_WORK_DAY": {
      const id = state.lastId + 1;
      const day = action.payload;
      day.id = id;
      day.items = [];
      return {
        ...state,
        lastId: id,
        days: [...state.days, day],
        selected: id,
        addDayDialogShow: false,
        removeDayDialogShow: false,
        dayItemDialogShow: false,
      };
    }

    case "REMOVE_WORK_DAY": {
      return {
        ...state,
        days: state.days.filter((day) => {
          return day.id !== state.selected;
        }),
        selected: (state.days.at(-1)?.id || 1),
        removeDayDialogShow: false,
      };
    }

    case "CLEAR_WORK_DAYS": {
      console.log('clear work days');
      return {
        ...state,
        event_id: "",
        event_name: "",
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

    case "ADD_DAY_DIALOG_HIDE": {
      return {
        ...state,
        addDayDialogShow: false,
      };
    }

    case "ADD_DAY_DIALOG_SHOW": {
      return {
        ...state,
        addDayDialogShow: true,
      };
    }

    case "REMOVE_DAY_DIALOG_SHOW": {
      return {
        ...state,
        removeDayDialogShow: true,
      };
    }

    case "REMOVE_DAY_DIALOG_HIDE": {
      return {
        ...state,
        removeDayDialogShow: false,
      };
    }

    case "DAY_ITEM_DIALOG_SHOW": {
      return {
        ...state,
        dayItemDialogShow: true,
      };
    }

    case "DAY_ITEM_DIALOG_HIDE": {
      return {
        ...state,
        dayItemDialogShow: false,
      };
    }

    default:
      return state;
  }
};


export {workDaysReducer};
export type workDaysReducerType = typeof workDaysReducer;
