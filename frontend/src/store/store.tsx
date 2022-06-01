import React from 'react';
import {createContext, useReducer} from 'react';
import {User} from "./auth";
import Reducer, {State} from "../reducer/reducer";


interface StoreContextType {
  user: User;
}

const initialState: State = {
  user: {
    username: "unknown",
    is_authenticated: false,
    type: "unauthenticated",
  },
};

interface IProviderProps {
  children: JSX.Element | JSX.Element[];

};

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer<Reducer, State>(Reducer, initialState);
  return (
    <Store.Provider value={[state, dispatch]}>
      {props.children}
    </Store.Provider>
  );
};
export const Store = createContext<StoreContextType>(null!);
export default Provider;
