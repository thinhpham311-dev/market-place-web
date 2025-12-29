import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProByCategoryIdState = (storeKey: string) => {
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
const proByCategoryIdSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProByCategoryIdState>
> = {};
const cacheKeys: string[] = [];

export const selectProByCategoryIdByStoreKey = (storeKey: string) => {
  if (!proByCategoryIdSelectorsCache[storeKey]) {
    proByCategoryIdSelectorsCache[storeKey] = makeSelectProByCategoryIdState(storeKey);
    cacheKeys.push(storeKey);

    // Xóa cache cũ nếu vượt quá giới hạn
    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proByCategoryIdSelectorsCache[oldestKey];
    }
  }

  return proByCategoryIdSelectorsCache[storeKey];
};
