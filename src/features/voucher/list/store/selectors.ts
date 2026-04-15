import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { VOUCHER_LIST_KEY } from "@/features/voucher/list/constants";

type VoucherListStoreSlice = {
  loading?: boolean;
  error?: string | null;
  data?: Record<string, any> | null;
};

type VoucherListSelectorResult = {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | null;
};

// Cache created selectors to prevent recreation on every render when called with parameter
const selectorCache: Record<string, (state: RootState) => VoucherListSelectorResult> = {};

export const selectVoucherListByStoreKey = (storeKey: string = VOUCHER_LIST_KEY) => {
  if (!selectorCache[storeKey]) {
    selectorCache[storeKey] = createSelector(
      (state: RootState) => state[storeKey] as VoucherListStoreSlice | undefined,
      (data) => ({
        loading: data?.loading ?? false,
        error: data?.error ?? null,
        data: data?.data ?? null,
      }),
    );
  }
  return selectorCache[storeKey];
};
