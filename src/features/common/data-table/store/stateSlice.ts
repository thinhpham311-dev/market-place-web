// features/cartTable/dataTableSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "@/features/common/data-table/store/initials";

// Slice
const dataTableSlice = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      const { storeKey, initialValue } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = initialValue ? { ...initialValue } : createDefault();
      }
    },
    setGrouping: (state, action) => {
      const { storeKey, grouping } = action.payload;
      state[storeKey].grouping = grouping;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
    },

    setColumnVisibility: (state, action) => {
      const { storeKey, columnVisibility } = action.payload;
      state[storeKey].columnVisibility = columnVisibility;
      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
    },
  },
});

export const { setInitialState, setGrouping, setColumnVisibility } = dataTableSlice.actions;

export default dataTableSlice.reducer;
