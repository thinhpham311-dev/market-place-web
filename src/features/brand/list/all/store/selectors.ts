import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const makeSelectBrandAllListState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      brands: data?.list,
      totalItems: data?.total,
      loading: data?.loading,
      error: data?.error,
    }),
  );

const cache: Record<string, ReturnType<typeof makeSelectBrandAllListState>> = {};

export const selectBrandAllListByStoreKey = (storeKey: string) => {
  if (!cache[storeKey]) {
    cache[storeKey] = makeSelectBrandAllListState(storeKey);
  }

  return cache[storeKey];
};
