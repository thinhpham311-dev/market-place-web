import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProByBrandIdState = (storeKey: string) => {
  return createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      products: data?.list,
      loading: data?.loading,
      status: data?.status,
      totalItems: data?.total,
      error: data?.error,
    }),
  );
};

const MAX_CACHE_SIZE = 100;
const proByBrandIdSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProByBrandIdState>
> = {};
const cacheKeys: string[] = [];

export const selectProByBrandIdByStoreKey = (storeKey: string) => {
  if (!proByBrandIdSelectorsCache[storeKey]) {
    proByBrandIdSelectorsCache[storeKey] = makeSelectProByBrandIdState(storeKey);
    cacheKeys.push(storeKey);

    // Xóa cache cũ nếu vượt quá giới hạn
    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proByBrandIdSelectorsCache[oldestKey];
    }
  }

  return proByBrandIdSelectorsCache[storeKey];
};
