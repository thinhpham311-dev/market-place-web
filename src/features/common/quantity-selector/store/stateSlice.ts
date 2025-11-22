import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IQuantity {
    currentQuantity: number;
    errorMessages: string[];
}

interface IState {
    [storeKey: string]: IQuantity;
}

const initialState: IState = {};

export const DEFAULT_VALUE: IQuantity = {
    currentQuantity: 1,
    errorMessages: []
}

const quantitySlice = createSlice({
    name: "quantity",
    initialState,
    reducers: {
        setInitialState(state, action: PayloadAction<{ storeKey: string; initialValue: IQuantity }>) {
            const { storeKey, initialValue } = action.payload;
            state[storeKey] = initialValue ?? { ...DEFAULT_VALUE };
        },
        setQuantity(state, action: PayloadAction<{ storeKey: string; quantity: number }>) {
            const { storeKey, quantity } = action.payload;
            if (!state[storeKey]) state[storeKey] = { ...DEFAULT_VALUE };

            state[storeKey].currentQuantity = quantity;
        },
        setErrorMessages(state, action: PayloadAction<{ storeKey: string; messages: string[] }>) {
            const { storeKey, messages } = action.payload;
            if (!state[storeKey]) state[storeKey] = { ...DEFAULT_VALUE };

            state[storeKey].errorMessages = messages;
        },
        resetQuantity(state, action: PayloadAction<{ storeKey: string }>) {
            const { storeKey } = action.payload;
            state[storeKey] = DEFAULT_VALUE

        },
    },
});

export const { setInitialState, setQuantity, setErrorMessages, resetQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
