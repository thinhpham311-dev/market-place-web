import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectCatAllListState = (storeKey: string) => {
  return createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      categories: data?.list,
      loading: data?.loading,
      totalItems: data?.total,
      error: data?.error,
    }),
  );
};

const MAX_CACHE_SIZE = 100;
const catAllListSelectorsCache: Record<string, ReturnType<typeof makeSelectCatAllListState>> = {};
const cacheKeys: string[] = [];

export const selectCatAllListByStoreKey = (storeKey: string) => {
  if (!catAllListSelectorsCache[storeKey]) {
    catAllListSelectorsCache[storeKey] = makeSelectCatAllListState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete catAllListSelectorsCache[oldestKey];
    }
  }

  return catAllListSelectorsCache[storeKey];
};
