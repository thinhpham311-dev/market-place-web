import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuantityItem {
    itemQuantity: number;
    errorMessages: string[];
}

interface QuantityState {
    [storeKey: string]: QuantityItem;
}

const initialState: QuantityState = {};

const quantitySlice = createSlice({
    name: "quantity",
    initialState,
    reducers: {
        setQuantity(state, action: PayloadAction<{ storeKey: string; quantity: number }>) {
            const { storeKey, quantity } = action.payload;
            state[storeKey] = state[storeKey] || { itemQuantity: 0, errorMessages: [] };
            state[storeKey].itemQuantity = quantity;
        },
        setErrorMessages(state, action: PayloadAction<{ storeKey: string; messages: string[] }>) {
            const { storeKey, messages } = action.payload;
            state[storeKey] = state[storeKey] || { itemQuantity: 0, errorMessages: [] };
            state[storeKey].errorMessages = messages;
        },
        resetQuantity(state, action: PayloadAction<{ storeKey: string }>) {
            const { storeKey } = action.payload;
            state[storeKey] = { itemQuantity: 1, errorMessages: [] };
        },
    },
});

export const { setQuantity, setErrorMessages, resetQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
