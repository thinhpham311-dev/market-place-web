import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { defaultCheckoutAddressValues } from "@/features/checkout/store/initials";

export const makeSelectCheckoutState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.state ?? null,
    (data) => ({
      paymentMethod: data?.paymentMethod ?? "cod",
      isSubmitting: data?.isSubmitting ?? false,
      addressValues: data?.addressValues ?? defaultCheckoutAddressValues,
    }),
  );

const checkoutSelectorsCache: Record<string, ReturnType<typeof makeSelectCheckoutState>> = {};

export const selectCheckoutByStoreKey = (storeKey: string) => {
  if (!checkoutSelectorsCache[storeKey]) {
    checkoutSelectorsCache[storeKey] = makeSelectCheckoutState(storeKey);
  }

  return checkoutSelectorsCache[storeKey];
};
