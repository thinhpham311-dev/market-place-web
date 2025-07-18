// src/features/product/variantSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantOption } from "../types/";

interface VariantState {
    selectedOptions: (VariantOption | null)[];
    validationErrors: string[];
}

const initialState: VariantState = {
    selectedOptions: [],
    validationErrors: [],
};

const variantSlice = createSlice({
    name: "variant",
    initialState,
    reducers: {
        setSelectedOption: (
            state,
            action: PayloadAction<{ index: number; value: VariantOption | null }>
        ) => {
            const { index, value } = action.payload
            state.selectedOptions[index] = value;
        },
        setValidationErrors: (state, action: PayloadAction<string[]>) => {
            state.validationErrors = action.payload;
        },
        resetVariants: (state) => {
            state.selectedOptions = [];
            state.validationErrors = [];
        },
    },
});

export const { setSelectedOption, setValidationErrors, resetVariants } = variantSlice.actions;
export default variantSlice.reducer;
