import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initials";
import { ensureStoreKeyState } from "@/features/common/price-display/helpers";

const stateSlice = createSlice({
  name: "price/state",
  initialState,
  reducers: {
    initPrice(state, action) {
      const { key, initialValue } = action.payload;
      ensureStoreKeyState(state, key);
      state[key] = initialValue;
    },
    setPrice(state, action) {
      const { storeKey, currentPrice } = action.payload;
      state[storeKey].currentPrice = currentPrice;
    },
    setMinPrice(state, action) {
      const { storeKey, minPrice } = action.payload;
      state[storeKey].minPrice = minPrice;
    },
    setMaxPrice(state, action) {
      const { storeKey, maxPrice } = action.payload;
      state[storeKey].maxPrice = maxPrice;
    },
    setFlashSalePrice(state, action) {
      const { storeKey, flashSalePrice } = action.payload;
      state[storeKey].flashSalePrice = flashSalePrice;
    },
    setDefaultPrice(state, action) {
      const { storeKey, defaultPrice } = action.payload;
      state[storeKey].defaultPrice = defaultPrice;
    },
    resetPrice(state, action) {
      const { key } = action.payload;
      delete state[key];
    },
  },
});

export const {
  initPrice,
  setPrice,
  setMinPrice,
  setMaxPrice,
  setFlashSalePrice,
  setDefaultPrice,
  resetPrice,
} = stateSlice.actions;

export default stateSlice.reducer;
