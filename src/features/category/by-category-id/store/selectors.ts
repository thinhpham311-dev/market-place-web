import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// 1. Factory tạo selector dựa vào storeKey
export const makeSelectCatByCategoryIdState = (storeKey: string) => {
    return createSelector(
        (state: RootState) => state[storeKey]?.data ?? null,
        (data) => ({
            categories: data?.list ?? [],
            loading: data?.loading ?? false,
            totalItems: data?.total ?? 0,
            error: data?.error ?? null,
        })
    );
};


// 2. Cache selector theo storeKey + giới hạn kích thước cache
const MAX_CACHE_SIZE = 100;
const catByCategoryIdSelectorsCache: Record<string, ReturnType<typeof makeSelectCatByCategoryIdState>> = {};
const cacheKeys: string[] = [];

/**
 * Lấy selector đã cache theo storeKey hoặc tạo mới nếu chưa có.
 * Tự động giới hạn cache tối đa MAX_CACHE_SIZE selector.
 */
export const selectCatByCategoryIdByStoreKey = (storeKey: string) => {
    if (!catByCategoryIdSelectorsCache[storeKey]) {
        // Tạo selector mới và lưu vào cache
        catByCategoryIdSelectorsCache[storeKey] = makeSelectCatByCategoryIdState(storeKey);
        cacheKeys.push(storeKey);

        // Xoá cache cũ nếu quá giới hạn
        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete catByCategoryIdSelectorsCache[oldestKey];
            }
        }
    }

    return catByCategoryIdSelectorsCache[storeKey];
};
