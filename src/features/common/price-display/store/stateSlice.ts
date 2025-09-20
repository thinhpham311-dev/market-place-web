import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceDisplayState {
    currentPrice: number;
    flashSalePrice?: number;
    defaultPrice?: number;
    minPrice?: number;
    maxPrice?: number;
    loading: boolean;
    error: string | { message?: string } | null;
}

const initialState: PriceDisplayState = {
    currentPrice: 0,
    flashSalePrice: undefined,
    defaultPrice: undefined,
    minPrice: 0,
    maxPrice: 0,
    loading: false,
    error: null,
};

const priceDisplaySlice = createSlice({
    name: "price",
    initialState,
    reducers: {
        setPrice(state, action: PayloadAction<number>) {
            state.currentPrice = action.payload;
        },
        setMinPrice(state, action: PayloadAction<number | undefined>) {
            state.minPrice = action.payload;
        },
        setMaxPrice(state, action: PayloadAction<number | undefined>) {
            state.maxPrice = action.payload;
        },
        setFlashSalePrice(state, action: PayloadAction<number | undefined>) {
            state.flashSalePrice = action.payload;
        },
        setDefaultPrice(state, action: PayloadAction<number | undefined>) {
            state.defaultPrice = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | { message?: string } | null>) {
            state.error = action.payload;
        },
        resetPrice(state) {
            state.currentPrice = 0;
            state.flashSalePrice = undefined;
            state.defaultPrice = undefined;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    setPrice,
    setMinPrice,
    setMaxPrice,
    setFlashSalePrice,
    setDefaultPrice,
    setLoading,
    setError,
    resetPrice,
} = priceDisplaySlice.actions;

export default priceDisplaySlice.reducer;
