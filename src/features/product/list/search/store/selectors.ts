import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// Factory tạo selector từ storeKey
export const makeSelectProSearchListState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[storeKey]?.data ?? null,
        (data) => ({
            products: data?.list ?? [],
            loading: data?.loading ?? false,
            totalItems: data?.total ?? 0,
            error: data?.error ?? null,
        })
    );

// ✅ Cache selector với giới hạn số lượng
const MAX_CACHE_SIZE = 100;
const proSearchListSelectorsCache: Record<string, ReturnType<typeof makeSelectProSearchListState>> = {};
const cacheKeys: string[] = [];

/**
 * Trả về selector theo storeKey.
 * Cache được giới hạn tối đa MAX_CACHE_SIZE entry để tránh memory leak.
 */
export const selectProSearchListByStoreKey = (storeKey: string) => {
    if (!proSearchListSelectorsCache[storeKey]) {
        // Tạo selector mới và cache lại
        proSearchListSelectorsCache[storeKey] = makeSelectProSearchListState(storeKey);
        cacheKeys.push(storeKey);

        // Xóa cache cũ nếu vượt quá giới hạn
        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) delete proSearchListSelectorsCache[oldestKey];
        }
    }

    return proSearchListSelectorsCache[storeKey];
};
