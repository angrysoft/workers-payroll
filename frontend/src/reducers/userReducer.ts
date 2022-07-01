import { Action } from ".";
import { User } from "../store/auth";

export type userState = {
   user: User,
   isLoading: boolean,
}


const userReducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case 'USER_LOGGED':
      console.log("reducer", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.results));
      return {user: action.payload.results, isLoading: false};
    case "USER_AUTH_CHECK":
      return {user: action.payload, isLoading: false};
    case "USER_AUTH_FAILED":
      localStorage.clear();
      return {user: action.payload, isLoading: false};
    case "USER_LOGOUT":
      localStorage.clear();
      return {user: action.payload, isLoading: false};

    default:
      return state;
  }
};

export {userReducer};
export type userReducerType = typeof userReducer;

