import { createSlice } from "@reduxjs/toolkit";
import { createDefault, initialState } from "./initials";
import { ensureStoreKeyState } from "@/features/common/price-display/helpers";

const stateSlice = createSlice({
  name: "price/state",
  initialState,
  reducers: {
    setPrice(state, action) {
      const { storeKey, currentPrice } = action.payload;

      ensureStoreKeyState(state, storeKey);
      state[storeKey].currentPrice = currentPrice;
    },
    setMinPrice(state, action) {
      const { storeKey, minPrice } = action.payload;

      ensureStoreKeyState(state, storeKey);

      state[storeKey].minPrice = minPrice;
    },
    setMaxPrice(state, action) {
      const { storeKey, maxPrice } = action.payload;

      ensureStoreKeyState(state, storeKey);

      state[storeKey].maxPrice = maxPrice;
    },
    setFlashSalePrice(state, action) {
      const { storeKey, flashSalePrice } = action.payload;

      ensureStoreKeyState(state, storeKey);

      state[storeKey].flashSalePrice = flashSalePrice;
    },
    setDefaultPrice(state, action) {
      const { storeKey, defaultPrice } = action.payload;

      ensureStoreKeyState(state, storeKey);

      state[storeKey].defaultPrice = defaultPrice;
    },
    resetPrice(state, action) {
      const { storeKey } = action.payload;
      state[storeKey] = createDefault();
    },
  },
});

export const {
  setPrice,
  setMinPrice,
  setMaxPrice,
  setFlashSalePrice,
  setDefaultPrice,
  resetPrice,
} = stateSlice.actions;

export default stateSlice.reducer;
