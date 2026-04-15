import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const makeSelectBrandListByCategoriesIdState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      brands: data?.list,
      totalItems: data?.total,
      loading: data?.loading,
      error: data?.error,
    }),
  );

const cache: Record<string, ReturnType<typeof makeSelectBrandListByCategoriesIdState>> = {};

export const selectBrandListByCategoriesIdAndStoreKey = (storeKey: string) => {
  if (!cache[storeKey]) {
    cache[storeKey] = makeSelectBrandListByCategoriesIdState(storeKey);
  }

  return cache[storeKey];
};
