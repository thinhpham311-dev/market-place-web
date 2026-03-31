import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/features/common/pagination/store/initials";
import { ensureStoreKeyState } from "@/features/common/pagination/helpers";

const calculateTotalPages = (totalItems = 0, limit = 10) => {
  const safeLimit = Math.max(1, limit || 1);
  return Math.max(1, Math.ceil(totalItems / safeLimit));
};

const stateSlice = createSlice({
  name: "pagination/state",
  initialState,
  reducers: {
    initPagination(state, action) {
      const { key, initialValue } = action.payload;
      const paginationState = ensureStoreKeyState(state, key);
      const nextLimit = initialValue?.defaultLimit ?? paginationState.limit;
      const nextTotalItems = initialValue?.defaultTotalItems ?? paginationState.totalItems ?? 0;
      const nextTotalPages = calculateTotalPages(nextTotalItems, nextLimit);

      paginationState.limit = nextLimit;
      paginationState.totalItems = nextTotalItems;
      paginationState.totalPages = nextTotalPages;
      paginationState.currentPage = Math.min(
        Math.max(initialValue?.defaultCurrentPage ?? paginationState.currentPage, 1),
        nextTotalPages,
      );
    },

    setPage(state, action) {
      const { key, page } = action.payload;
      state[key].currentPage = page;
    },

    setLimit(state, action) {
      const { key, limit } = action.payload;
      state[key].limit = limit;
      state[key].totalPages = calculateTotalPages(state[key].totalItems, limit);
      state[key].currentPage = Math.min(state[key].currentPage, state[key].totalPages);
    },

    syncPagination(state, action) {
      const { key, totalItems, limit, currentPage } = action.payload;
      const paginationState = ensureStoreKeyState(state, key);

      if (typeof limit === "number" && limit > 0) {
        paginationState.limit = limit;
      }

      if (typeof totalItems === "number") {
        paginationState.totalItems = totalItems;
      }

      const nextTotalPages = calculateTotalPages(paginationState.totalItems, paginationState.limit);
      paginationState.totalPages = nextTotalPages;

      if (typeof currentPage === "number") {
        paginationState.currentPage = Math.min(Math.max(currentPage, 1), nextTotalPages);
      } else {
        paginationState.currentPage = Math.min(paginationState.currentPage, nextTotalPages);
      }
    },

    resetPagination(state, action) {
      const { key } = action.payload;
      delete state[key];
    },
  },
});

export const { initPagination, setPage, setLimit, syncPagination, resetPagination } =
  stateSlice.actions;
export default stateSlice.reducer;
