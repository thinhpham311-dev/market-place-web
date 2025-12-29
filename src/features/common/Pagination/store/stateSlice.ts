import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "@/features/common/pagination/store/initials";

const stateSlice = createSlice({
  name: "pagination/state",
  initialState,
  reducers: {
    setInitialValue: (state, action) => {
      const { storeKey, initialValue } = action.payload;
      const { totalItems, limit } = initialValue;
      const totalPages = Math.ceil(totalItems / limit);

      if (!state[storeKey]) {
        state[storeKey] = initialValue ? { ...initialValue, totalPages } : createDefault();
      }
    },
    setPage(state, action) {
      const { storeKey, page } = action.payload;
      state[storeKey].currentPage = page;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
    },
    resetPagination(state, action) {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const { setPage, setInitialValue, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
