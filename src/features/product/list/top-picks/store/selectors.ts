import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// Factory tạo selector từ storeKey
export const makeSelectProTopPickListState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[storeKey]?.data ?? null,
    (data) => ({
      products: data?.list ?? [],
      loading: data?.loading ?? false,
      error: data?.error ?? null,
      totalItems: data?.total ?? 0,
    }),
  );

// ✅ Cache selector với giới hạn số lượng
const MAX_CACHE_SIZE = 100;
const proTopPickListSelectorsCache: Record<
  string,
  ReturnType<typeof makeSelectProTopPickListState>
> = {};
const cacheKeys: string[] = [];

/**
 * Trả về selector theo storeKey.
 * Cache được giới hạn tối đa MAX_CACHE_SIZE entry để tránh memory leak.
 */
export const selectProTopPickListByStoreKey = (storeKey: string) => {
  if (!proTopPickListSelectorsCache[storeKey]) {
    // Tạo selector mới và cache lại
    proTopPickListSelectorsCache[storeKey] = makeSelectProTopPickListState(storeKey);
    cacheKeys.push(storeKey);

    // Xóa cache cũ nếu vượt quá giới hạn
    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) delete proTopPickListSelectorsCache[oldestKey];
    }
  }

  return proTopPickListSelectorsCache[storeKey];
};
