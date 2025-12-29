import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPriceDisplay, createDefault, initialState } from "./initial";

const stateSlice = createSlice({
  name: "price/state",
  initialState,
  reducers: {
    setInitialState(
      state,
      action: PayloadAction<{ storeKey: string; initialValue: IPriceDisplay }>,
    ) {
      const { storeKey, initialValue } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = initialValue ? { ...initialValue } : createDefault();
      }
    },
    setPrice(state, action: PayloadAction<{ storeKey: string; currentPrice: number }>) {
      const { storeKey, currentPrice } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].currentPrice = currentPrice;
    },
    setMinPrice(state, action: PayloadAction<{ storeKey: string; minPrice: number }>) {
      const { storeKey, minPrice } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].minPrice = minPrice;
    },
    setMaxPrice(state, action: PayloadAction<{ storeKey: string; maxPrice: number }>) {
      const { storeKey, maxPrice } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].maxPrice = maxPrice;
    },
    setFlashSalePrice(state, action: PayloadAction<{ storeKey: string; flashSalePrice: number }>) {
      const { storeKey, flashSalePrice } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].flashSalePrice = flashSalePrice;
    },
    setDefaultPrice(state, action: PayloadAction<{ storeKey: string; defaultPrice: number }>) {
      const { storeKey, defaultPrice } = action.payload;

      if (!state[storeKey]) {
        state[storeKey] = createDefault();
      }
      state[storeKey].defaultPrice = defaultPrice;
    },
    resetPrice(state, action: PayloadAction<{ storeKey: string }>) {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const {
  setInitialState,
  setPrice,
  setMinPrice,
  setMaxPrice,
  setFlashSalePrice,
  setDefaultPrice,
  resetPrice,
} = stateSlice.actions;

export default stateSlice.reducer;
