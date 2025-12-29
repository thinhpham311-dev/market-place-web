import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProSearchListState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      products: data?.list ?? [],
      loading: data?.loading ?? false,
      totalItems: data?.total ?? 0,
      error: data?.error ?? null,
      status: data?.status,
    }),
  );

const MAX_CACHE_SIZE = 100;
const proSearchListSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProSearchListState>
> = {};
const cacheKeys: string[] = [];

export const selectProSearchListByStoreKey = (storeKey: string) => {
  if (!proSearchListSelectorsCache[storeKey]) {
    proSearchListSelectorsCache[storeKey] = makeSelectProSearchListState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proSearchListSelectorsCache[oldestKey];
    }
  }

  return proSearchListSelectorsCache[storeKey];
};
