import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const makeSelectBrandPopularListState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      brands: data?.list,
      totalItems: data?.total,
      loading: data?.loading,
      error: data?.error,
    }),
  );

const cache: Record<string, ReturnType<typeof makeSelectBrandPopularListState>> = {};

export const selectBrandPopularListByStoreKey = (storeKey: string) => {
  if (!cache[storeKey]) {
    cache[storeKey] = makeSelectBrandPopularListState(storeKey);
  }

  return cache[storeKey];
};
