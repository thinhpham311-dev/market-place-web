import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "@/features/common/option-selector/types";
import {
    IOption,
    createDefault,
    initialState,
} from "./initial";

const optionSlice = createSlice({
    name: "option/state",
    initialState,
    reducers: {
        setInitialState(
            state,
            action: PayloadAction<{ storeKey: string; initialValue?: IOption }>
        ) {
            const { storeKey, initialValue } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = initialValue
                    ? { ...initialValue }
                    : createDefault();
            }
        },
        setSelectedOption: (
            state,
            action: PayloadAction<{
                storeKey: string;
                currentValue: { index: number; value: Option | number | null };
            }>
        ) => {
            const { storeKey, currentValue } = action.payload;
            const { index, value } = currentValue;

            // 🔒 đảm bảo state tồn tại
            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }

            // 🔒 ensure array length
            if (!Array.isArray(state[storeKey].selectedOptions)) {
                state[storeKey].selectedOptions = [];
            }



            state[storeKey].selectedOptions[index] = value;
        },

        setValidationErrors: (
            state,
            action: PayloadAction<{ storeKey: string; errors: Record<number, string> }>
        ) => {
            const { storeKey, errors } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }

            state[storeKey].validationErrors = errors;
        },

        resetOptions: (state, action: PayloadAction<{ storeKey: string }>) => {
            const { storeKey } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }
            state[storeKey].selectedOptions = [];
            state[storeKey].validationErrors = [];
        },
    },
});

export const {
    setInitialState,
    setSelectedOption,
    setValidationErrors,
    resetOptions,
} = optionSlice.actions;

export default optionSlice.reducer;
