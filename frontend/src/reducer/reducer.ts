import { User } from "../store/auth";

export interface State {
  user: User,
}

export interface Action {
  type: string;
  payload: any;
};


const Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'USER_LOGGED':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
;
export default Reducer;
