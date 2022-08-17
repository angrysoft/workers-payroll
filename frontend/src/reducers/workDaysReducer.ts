import { Action } from ".";
import { IUserItem } from "../routes/Workers";

export type workDaysState = {
  event_id: string;
  event_name: string;
  dates: Array<string>;
  days : Array<IDayItem>;
  daysToRemove: Array<IDayItem>;
  selected: string;
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
  id: string;
  event: IEvent;
  function: IFunction;
  worker: IUserItem;
  start: string;
  end: string;
  additions: Array<any>;
}

interface IEvent {
  id: string;
  name: string,
  number: string,
  is_readonly: boolean;
}

interface IFunction {
  id: string;
  name: string;
}

const workDaysReducer = (
    state: workDaysState,
    action: Action): workDaysState => {
  switch (action.type) {
    case "LOAD_WORK_DAYS": {
      console.log("load days", action.payload);
      return {
        ...state,
        ...action.payload,
        selected: action.payload.dates.at(0),
      };
    }

    case "ADD_WORK_DAY": {
      const day = action.payload;

      return {
        ...state,
        dates: [...state.dates, day],
        selected: day,
        addDayDialogShow: false,
        removeDayDialogShow: false,
        dayItemDialogShow: false,
      };
    }

    case "REMOVE_WORK_DAY": {
      return {
        ...state,
        dates: state.dates.filter((day) => {
          return day !== state.selected;
        }),
        selected: (state.dates.at(-1) || ""),
        daysToRemove: [
          ...state.daysToRemove,
          ...state.days.filter((day) => {
            return day.start == state.selected;
          }),
        ],
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
        dates: [],
        selected: "",
      };
    }

    case "ADD_WORKER_WORK_DAY": {
      console.log("ADD_W_W_DAY", action.payload);
      return {
        ...state,
        days: [...state.days, action.payload],
        dayItemDialogShow: false,
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
export type { IDayItem, IWorkDay };

