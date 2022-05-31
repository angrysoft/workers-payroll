import { createSlice } from "@reduxjs/toolkit";

export interface TableState {
  selected: Array<string>;
}


const initialTableState: TableState = {
  selected: [],
};


export const tableSlice = createSlice({
  name: "table",
  initialState: initialTableState,
  reducers: {
    setSelect: (state, action) => {
      return {
        selected: Array(action.payload),
      };
    },
    addSelect: (state, action) => {
      return {
        selected: state.selected.concat(Array(action.payload)),
      };
    },
  },
});


export const { setSelect, addSelect } = tableSlice.actions;
export default tableSlice.reducer;

