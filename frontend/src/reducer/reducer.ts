import { User } from "../store/auth";

export type State = {
   user: User,
   isLoading: boolean,
}

export interface Action {
  type: string;
  payload: User;
};


const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER_LOGGED':
      console.log("reducer", action.payload);
      return {user: action.payload, isLoading: false};
    default:
      return state;
  }
};

export default Reducer;
export type ReducerType = typeof Reducer;
