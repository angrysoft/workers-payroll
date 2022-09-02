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
  dayItemDialogEdit: null | string;
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
      const dateSelected = new Date(state.selected).toLocaleDateString();

      return {
        ...state,
        dates: state.dates.filter((day) => {
          return day !== state.selected;
        }),
        selected: (state.dates.at(-1) || ""),
        days: [
          ...state.days.filter((day) => {
            return new Date(day.start).toLocaleDateString() !==
            dateSelected;
          }),
        ],
        daysToRemove: [
          ...state.daysToRemove,
          ...state.days.filter((day) => {
            return new Date(day.start).toLocaleDateString() ===
            dateSelected;
          }),
        ],
        removeDayDialogShow: false,
      };
    }

    case "CLEAR_WORK_DAYS": {
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

    case "REMOVE_WORKER": {
      return {
        ...state,
        days: state.days.filter((day) => day.id.toString() !== action.payload),
        daysToRemove: [
          ...state.daysToRemove,
          ...state.days.filter((day) => day.id.toString() === action.payload),
        ],
      };
    }

    case "SELECT_WORK_DAY": {
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
        dayItemDialogEdit: action.payload,
      };
    }

    case "DAY_ITEM_DIALOG_HIDE": {
      return {
        ...state,
        dayItemDialogShow: false,
        dayItemDialogEdit: null,
      };
    }

    default:
      return state;
  }
};


export {workDaysReducer};
export type workDaysReducerType = typeof workDaysReducer;
export type { IDayItem, IWorkDay };

