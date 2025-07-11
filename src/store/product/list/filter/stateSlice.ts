// store/filter/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilter {
    brand?: string[];
    priceRange?: [number, number];
    condition?: string[];
    promotion?: string[];
}

const initialState: IFilter = {
    brand: [],
    priceRange: [0, 0],
    condition: [],
    promotion: [],
};

const stateSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<IFilter>) => {
            return { ...state, ...action.payload };
        },
        updateFilter: (
            state,
            action: PayloadAction<{ key: keyof IFilter; value: any }>
        ) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        resetFilters: () => initialState,
    },
});

export const { setFilters, updateFilter, resetFilters } = stateSlice.actions;
export default stateSlice.reducer;
