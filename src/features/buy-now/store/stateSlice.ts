import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/features/checkout/store/initials";
import type { PaymentMethod } from "@/types/payment";
import type { CheckoutAddressValues } from "@/features/checkout/types/checkout";

const stateSlice = createSlice({
  name: "checkout/state",
  initialState,
  reducers: {
    setCheckoutPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setCheckoutAddressValue: <K extends keyof CheckoutAddressValues>(
      state: typeof initialState,
      action: PayloadAction<{ key: K; value: CheckoutAddressValues[K] }>,
    ) => {
      state.addressValues[action.payload.key] = action.payload.value;
    },
    setCheckoutSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetCheckoutState: () => initialState,
  },
});

export const {
  setCheckoutPaymentMethod,
  setCheckoutAddressValue,
  setCheckoutSubmitting,
  resetCheckoutState,
} = stateSlice.actions;

export default stateSlice.reducer;
