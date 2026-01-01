import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "@/features/common/sort-by/store/initials";
import { ensureStoreKeyState } from "@/features/common/sort-by/helpers";

const stateSlice = createSlice({
  name: "sort/state",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      const { storeKey, sortBy } = action.payload;
      ensureStoreKeyState(state, storeKey);
      state[storeKey].sortBy = sortBy;
      state[storeKey].data = action.payload.data;
    },
    resetSortBy: (state, action) => {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const { setSortBy, resetSortBy } = stateSlice.actions;
export default stateSlice.reducer;
