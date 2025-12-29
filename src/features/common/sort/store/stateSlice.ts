import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "@/features/common/sort/store/initials";

const stateSlice = createSlice({
  name: "sort/state",
  initialState,
  reducers: {
    setInitialValue: (state, action) => {
      const { storeKey, initialValue } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = initialValue ? { ...initialValue } : createDefault();
      }
    },
    setSortBy: (state, action) => {
      const { storeKey, sortBy } = action.payload;
      state[storeKey].sortBy = sortBy;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
    },
    resetSortBy: (state, action) => {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const { setInitialValue, setSortBy, resetSortBy } = stateSlice.actions;
export default stateSlice.reducer;
