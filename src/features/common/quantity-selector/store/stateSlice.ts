import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuantityState {
    currentQuantity: number;
    errorMessages: string[];
}

const initialState: QuantityState = {
    currentQuantity: 1,
    errorMessages: [],
};

const stateSlice = createSlice({
    name: "quantity",
    initialState,
    reducers: {
        setQuantity: (state, action: PayloadAction<number>) => {
            state.currentQuantity = action.payload;
        },
        setErrorMessages: (state, action: PayloadAction<string[]>) => {
            state.errorMessages = action.payload;
        },
        resetQuantity: (state) => {
            state.currentQuantity = 1;
            state.errorMessages = [];
        },
    },
});

export const { setQuantity, setErrorMessages, resetQuantity } =
    stateSlice.actions;

export default stateSlice.reducer;
