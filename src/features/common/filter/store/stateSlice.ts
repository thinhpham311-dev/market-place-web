import { createSlice } from "@reduxjs/toolkit";
import { initialState, createDefault } from "./initials";

const filterSlice = createSlice({
    name: "filter/state",
    initialState,
    reducers: {
        setInitialFilter(state, action) {
            const { storeKey, initialValue } = action.payload
            if (!state[storeKey]) {
                state[storeKey] = initialValue
                    ? { ...initialValue }
                    : createDefault();
            }
        },

        setFilter(state, action) {
            const { storeKey, key, value } = action.payload
            state[storeKey].filter[key] = value;
            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }

        },

        resetFilter(state, action) {
            const { storeKey, key } = action.payload
            delete state[storeKey].filter[key];
            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }

        },

        resetAllFilters(state, action) {
            const { storeKey } = action.payload
            state[storeKey].filter = createDefault();

        },
    },
});

export const { setInitialFilter, setFilter, resetFilter, resetAllFilters } =
    filterSlice.actions;
export default filterSlice.reducer;
