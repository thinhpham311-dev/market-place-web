import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/features/common/quantity-selector/store/initials";
import { ensureStoreKeyState } from "@/features/common/quantity-selector/helpers";

const quantitySlice = createSlice({
  name: "quantity/state",
  initialState,
  reducers: {
    initQuantity(state, action) {
      const { key, initialValue } = action.payload;
      ensureStoreKeyState(state, key);
      state[key] = { ...initialValue };
    },
    setQuantity(state, action) {
      const { key, quantity } = action.payload;
      ensureStoreKeyState(state, key);
      state[key].currentQuantity = quantity;
    },
    resetQuantity(state, action) {
      const { key } = action.payload;
      delete state[key];
    },
  },
});

export const { initQuantity, setQuantity, resetQuantity } = quantitySlice.actions;

export default quantitySlice.reducer;
