import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectCatPopularListState = (storeKey: string) => {
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
const catPopularListSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectCatPopularListState>
> = {};
const cacheKeys: string[] = [];

export const selectCatPopularListByStoreKey = (storeKey: string) => {
  if (!catPopularListSelectorsCache[storeKey]) {
    catPopularListSelectorsCache[storeKey] = makeSelectCatPopularListState(storeKey);
    cacheKeys.push(storeKey);

    // Xóa cache cũ nếu vượt quá giới hạn
    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete catPopularListSelectorsCache[oldestKey];
    }
  }

  return catPopularListSelectorsCache[storeKey];
};
