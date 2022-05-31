import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../futures/auth";
import tableReducer from "../futures/table";


const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
  },
});


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
