// store/filter/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "@/features/common/filter/types";

const initialState: IFilter = {};

const filterSlice = createSlice({
    name: "filter/state",
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<{ key: string; value: any }>) {
            state[action.payload.key] = action.payload.value;
        },
        resetFilter(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },
        resetAllFilters() {
            return initialState;
        },
    },
});

export const { setFilter, resetFilter, resetAllFilters } = filterSlice.actions;
export default filterSlice.reducer;
