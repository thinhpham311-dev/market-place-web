import { createSlice } from "@reduxjs/toolkit";
import { Option } from "@/features/common/option-selector/types";

interface OptionState {
    options: (Option | null)[],
    selectedOptions: (Option | null)[];
    validationErrors: string[];
}

const initialState: OptionState = {
    options: [],
    selectedOptions: [],
    validationErrors: [],
};

const optionSlice = createSlice({
    name: "option/state",
    initialState,
    reducers: {
        initialOptions(state, action) {
            state.options = action.payload;
            state.validationErrors = [];
        },
        setSelectedOption: (state, action) => {
            const { index, value } = action.payload
            state.selectedOptions[index] = value;
        },
        setValidationErrors: (state, action) => {
            state.validationErrors = action.payload;
        },
        resetOptions: (state) => {
            state.selectedOptions = [];
            state.validationErrors = [];
        },
    },
});

export const { initialOptions, setSelectedOption, setValidationErrors, resetOptions } = optionSlice.actions;
export default optionSlice.reducer;
