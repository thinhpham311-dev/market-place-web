import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  current: number;
}

const initialState: ProductState = {
  current: 0,
};

const stateSlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { setCurrent } = stateSlice.actions;
export default stateSlice.reducer;
