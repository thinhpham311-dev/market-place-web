// src/features/product/variantSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { VariantOption } from "../types/";

interface VariantState {
    data: (VariantOption | null)[],
    selectedOptions: (VariantOption | null)[];
    validationErrors: string[];
}

const initialState: VariantState = {
    data: [],
    selectedOptions: [],
    validationErrors: [],
};

const variantSlice = createSlice({
    name: "variant/state",
    initialState,
    reducers: {
        initialOptions(state, action) {
            state.data = action.payload;
            state.validationErrors = [];
        },
        setSelectedOption: (state, action) => {
            const { index, value } = action.payload
            state.selectedOptions[index] = value;
        },
        setValidationErrors: (state, action) => {
            state.validationErrors = action.payload;
        },
        resetVariants: (state) => {
            state.selectedOptions = [];
            state.validationErrors = [];
        },
    },
});

export const { initialOptions, setSelectedOption, setValidationErrors, resetVariants } = variantSlice.actions;
export default variantSlice.reducer;
