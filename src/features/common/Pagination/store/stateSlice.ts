import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/features/common/pagination/store/initials";
import { ensureStoreKeyState } from "@/features/common/pagination/helpers";

const stateSlice = createSlice({
  name: "pagination/state",
  initialState,
  reducers: {
    initPagination(state, action) {
      const { key } = action.payload;
      ensureStoreKeyState(state, key);
    },

    setPage(state, action) {
      const { key, page } = action.payload;
      state[key].currentPage = page;
    },

    setLimit(state, action) {
      const { key, limit } = action.payload;
      state[key].limit = limit;
    },

    resetPagination(state, action) {
      const { key } = action.payload;
      delete state[key];
    },
  },
});

export const { initPagination, setPage,setLimit, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
