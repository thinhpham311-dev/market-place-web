import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProDailyDiscoverState = (storeKey: string) => {
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
const proDailyDiscoverSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProDailyDiscoverState>
> = {};
const cacheKeys: string[] = [];

export const selectProDailyDiscoverByStoreKey = (storeKey: string) => {
  if (!proDailyDiscoverSelectorsCache[storeKey]) {
    proDailyDiscoverSelectorsCache[storeKey] = makeSelectProDailyDiscoverState(storeKey);
    cacheKeys.push(storeKey);

    // Xóa cache cũ nếu vượt quá giới hạn
    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proDailyDiscoverSelectorsCache[oldestKey];
    }
  }

  return proDailyDiscoverSelectorsCache[storeKey];
};
