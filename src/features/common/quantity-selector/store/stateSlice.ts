import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IQuantity {
    currentQuantity: number;
}

interface IState {
    [storeKey: string]: IQuantity;
}

const DEFAULT_VALUE: IQuantity = {
    currentQuantity: 1,
};

const initialState: IState = {};

const quantitySlice = createSlice({
    name: "quantity/state",
    initialState,
    reducers: {
        setInitialState(
            state,
            action: PayloadAction<{ storeKey: string; initialValue?: IQuantity }>
        ) {
            const { storeKey, initialValue } = action.payload;
            // nếu không truyền initialValue → lấy default (1)
            state[storeKey] = initialValue
                ? { ...initialValue }
                : { ...DEFAULT_VALUE };
        },

        setQuantity(
            state,
            action: PayloadAction<{ storeKey: string; quantity: number }>
        ) {
            const { storeKey, quantity } = action.payload;

            // nếu chưa có → tạo default với quantity=1
            if (!state[storeKey]) {
                state[storeKey] = { ...DEFAULT_VALUE };
            }

            state[storeKey].currentQuantity = quantity;
        },

        resetQuantity(state, action: PayloadAction<{ storeKey: string }>) {
            const { storeKey } = action.payload;
            state[storeKey] = { ...DEFAULT_VALUE }; // clone để tránh share reference
        },

    },
});

export const {
    setInitialState,
    setQuantity,
    resetQuantity,
} = quantitySlice.actions;

export default quantitySlice.reducer;
