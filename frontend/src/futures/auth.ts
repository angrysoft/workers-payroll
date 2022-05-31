import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  is_authenticated: boolean;
  type: string;
}


const initialUserState: UserState = {
  username: "anonymous",
  is_authenticated: false,
  type: "unauthenticated",
};


export const userSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state) => initialUserState,
  },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

