import React from "react";
import { createContext, useReducer } from "react";
import rootReducer, { RootState } from "../reducers/rootReducer";

const initialState: RootState = {
  users: {
    user: {
      username: "unknown",
      is_authenticated: false,
      id: -1,
      is_coordinator: false,
    },
    isLoading: false,
  },
  table: {},
  dialog: {
    msg: "",
    show: false,
    backTo: "",
  },
  confirmDialog: {
    msg: "",
    show: false,
    command: "",
    payload: null,
  },
  workDays: {
    dates: [],
    days: [],
    event: {
      id: -1,
      name: "",
      number: "",
      coordinator: {},
      account_manager: {},
      is_readonly: false,
    },
    daysEdited: [],
    daysToRemove: [],
    selected: "",
    addDayDialogShow: false,
    removeDayDialogShow: false,
    dayItemDialogShow: false,
    dayItemDialogEdit: null,
    touch_days: false,
  },
  report: {
    year: new Date().getFullYear().toString(),
    month: new Date().getMonth().toString(),
  },
  menu: {
    open: false,
  },
};

interface IProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { Provider, AppContext, initialState };
