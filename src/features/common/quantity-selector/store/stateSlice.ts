import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IQuantity, createDefault,
    initialState
} from "@/features/common/quantity-selector/store/initials"

const quantitySlice = createSlice({
    name: "quantity/state",
    initialState,
    reducers: {
        // Khởi tạo state cho 1 storeKey nếu chưa có
        setInitialState(
            state,
            action: PayloadAction<{ storeKey: string; initialValue?: IQuantity }>
        ) {
            const { storeKey, initialValue } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = initialValue
                    ? { ...initialValue }
                    : createDefault();
            }
        },

        // Set số lượng trực tiếp
        setQuantity(
            state,
            action: PayloadAction<{ storeKey: string; quantity: number }>
        ) {
            const { storeKey, quantity } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = createDefault();
            }

            state[storeKey].currentQuantity = quantity;
        },

        // Reset về mặc định
        resetQuantity(state, action: PayloadAction<{ storeKey: string }>) {
            const { storeKey } = action.payload;
            state[storeKey] = createDefault();
        },
    },
});

export const {
    setInitialState,
    setQuantity,
    resetQuantity,
} = quantitySlice.actions;

export default quantitySlice.reducer;
