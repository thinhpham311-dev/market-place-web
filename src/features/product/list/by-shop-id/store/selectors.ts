import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProByShopIdState = (storeKey: string) => {
  return createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      products: data?.list ?? [],
      loading: data?.loading ?? false,
      status: data?.status ?? "idle",
      totalItems: data?.total ?? 0,
      page: data?.page ?? 1,
      limit: data?.limit ?? 20,
      error: data?.error ?? null,
    }),
  );
};

const MAX_CACHE_SIZE = 100;
const proByShopIdSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProByShopIdState>
> = {};
const cacheKeys: string[] = [];

export const selectProByShopIdByStoreKey = (storeKey: string) => {
  if (!proByShopIdSelectorsCache[storeKey]) {
    proByShopIdSelectorsCache[storeKey] = makeSelectProByShopIdState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proByShopIdSelectorsCache[oldestKey];
    }
  }

  return proByShopIdSelectorsCache[storeKey];
};
