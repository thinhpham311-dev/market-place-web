// store/filter/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "@/interfaces/filter";

const initialState: IFilter = {
    brand: [],
    priceRange: [0, 0],
    condition: [],
    promotion: [],
};

const stateSlice = createSlice({
    name: "filter/state",
    initialState,
    reducers: {
        setBrand(state, action: PayloadAction<string[]>) {
            state.brand = action.payload;
        },
        setPriceRange(state, action: PayloadAction<[number, number]>) {
            state.priceRange = action.payload;
        },
        setCondition(state, action: PayloadAction<string[]>) {
            state.condition = action.payload;
        },
        setPromotion(state, action: PayloadAction<string[]>) {
            state.promotion = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const {
    setBrand,
    setPriceRange,
    setCondition,
    setPromotion,
    resetFilters,
} = stateSlice.actions;

export default stateSlice.reducer;
