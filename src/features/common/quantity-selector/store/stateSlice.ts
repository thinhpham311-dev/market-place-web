import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    createDefault,
    initialState
} from "@/features/common/quantity-selector/store/initials"
import { ensureStoreKeyState } from "@/features/common/quantity-selector/helpers";

const quantitySlice = createSlice({
    name: "quantity/state",
    initialState,
    reducers: {
        setQuantity(
            state,
            action: PayloadAction<{ storeKey: string; quantity: number }>
        ) {
            const { storeKey, quantity } = action.payload;
            ensureStoreKeyState(state, storeKey);
            state[storeKey].currentQuantity = quantity;
        },
        resetQuantity(state, action: PayloadAction<{ storeKey: string }>) {
            const { storeKey } = action.payload;
            state[storeKey] = createDefault();
        },
    },
});

export const {
    setQuantity,
    resetQuantity,
} = quantitySlice.actions;

export default quantitySlice.reducer;
