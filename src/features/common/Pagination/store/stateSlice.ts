import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/features/common/pagination/store/initials";
import { ensureStoreKeyState } from "@/features/common/pagination/helpers";

const stateSlice = createSlice({
  name: "pagination/state",
  initialState,
  reducers: {
    initPagination(state, action) {
      const { key, initialValue } = action.payload;
      ensureStoreKeyState(state, key);

      const totalPages = Math.ceil(initialValue.totalItems / initialValue.limit);

      state[key] = {
        ...initialValue,
        totalPages,
      };
    },

    setPage(state, action) {
      const { key, page } = action.payload;
      state[key].currentPage = page;
    },

    resetPagination(state, action) {
      const { key } = action.payload;
      delete state[key];
    },
  },
});

export const { initPagination, setPage, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
