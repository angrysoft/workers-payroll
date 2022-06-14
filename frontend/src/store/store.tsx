import React from "react";
import { createContext, useReducer } from "react";
import Reducer, { State } from "../reducer/reducer";

const initialState: State = {
  user: {
    username: "unknown",
    is_authenticated: false,
    user_id: -1,
    is_coordinator: false,
  },
  isLoading: false,
};

interface IProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { Provider, AppContext };
