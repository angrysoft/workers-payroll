import { User } from "../store/auth";

export type State = {
   user: User,
   isLoading: boolean,
}

export interface Action {
  type: string;
  payload: any;
};


const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER_LOGGED':
      console.log("reducer", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.results));
      return {user: action.payload.results, isLoading: false};
    case "USER_AUTH_CHECH":
      return {user: action.payload, isLoading: false};

    default:
      return state;
  }
};

export default Reducer;
export type ReducerType = typeof Reducer;
