import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "./initials";

const filterSlice = createSlice({
  name: "filter/state",
  initialState,
  reducers: {
    setInitialFilter(state, action) {
      const { storeKey, initialValue } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = initialValue ? { ...initialValue } : createDefault();
      }
    },

    setFilter(state, action) {
      const { storeKey, key, value } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].filter[key] = value;
    },

    setFilterData(state, action) {
      const { storeKey, data } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }

      state[storeKey].data = data;
    },

    resetFilter(state, action) {
      const { storeKey, key } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      delete state[storeKey].filter[key];
    },

    resetAllFilters(state, action) {
      const { storeKey } = action.payload;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].filter = createDefault().filter;
    },
  },
});

export const { setInitialFilter, setFilter, setFilterData, resetFilter, resetAllFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
