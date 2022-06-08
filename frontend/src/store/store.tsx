import React from "react";
import { createContext, useReducer } from "react";
import Reducer, { State } from "../reducer/reducer";

const initialState: State = {
  user: {
    username: "unknown",
    is_authenticated: false,
    type: "unauthenticated",
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
