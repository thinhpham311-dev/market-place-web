import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "@/features/common/pagination/store/initials";
import { ensureStoreKeyState } from "@/features/common/pagination/helpers";

const stateSlice = createSlice({
  name: "pagination/state",
  initialState,
  reducers: {
    setTotalPages(state, action) {
      const { storeKey, totalItems, limit } = action.payload;
      ensureStoreKeyState(state, storeKey);
      const total = Math.ceil(totalItems / limit);
      state[storeKey].totalPages = total;
    },
    setPage(state, action) {
      const { storeKey, page } = action.payload;
      ensureStoreKeyState(state, storeKey);
      state[storeKey].currentPage = page;
    },
    resetPagination(state, action) {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const { setTotalPages, setPage, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
