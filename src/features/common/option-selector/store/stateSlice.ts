import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "@/features/common/option-selector/types";

interface IOption {
    options: (Option | null)[];
    selectedOptions: (Option | number | null)[];
    validationErrors: string[];
}

interface IState {
    [storeKey: string]: IOption;
}

const initialState: IState = {};

const optionSlice = createSlice({
    name: "option/state",
    initialState,
    reducers: {
        setInitialState: (
            state,
            action: PayloadAction<{ storeKey: string; initialValue: IOption }>
        ) => {
            const { storeKey, initialValue } = action.payload;
            state[storeKey] = initialValue
        },
        setSelectedOption: (
            state,
            action: PayloadAction<{ storeKey: string; currentValue: { index: number; value: Option | number | null } }>
        ) => {
            const { storeKey, currentValue } = action.payload;
            const { index, value } = currentValue
            state[storeKey].selectedOptions[index] = value;
        },
        setValidationErrors: (
            state,
            action: PayloadAction<{ storeKey: string; errors: string[] }>
        ) => {
            const { storeKey, errors } = action.payload;
            state[storeKey].validationErrors = errors;
        },
        resetOptions: (state, action: PayloadAction<{ storeKey: string }>) => {
            const { storeKey } = action.payload;
            state[storeKey].selectedOptions = [];
            state[storeKey].validationErrors = [];
        },
    },
});

export const { setInitialState, setSelectedOption, setValidationErrors, resetOptions } =
    optionSlice.actions;

export default optionSlice.reducer;
