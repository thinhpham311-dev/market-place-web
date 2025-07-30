import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// 1. Factory tạo selector dựa vào storeKey
export const makeSelectProByCategoryIdState = (storeKey: string) => {
    console.log("🔁 Creating selector for:", storeKey); // log khi selector mới được tạo
    return createSelector(
        (state: RootState) => state[storeKey]?.data ?? null,
        (data) => ({
            products: data?.list ?? [],
            loading: data?.loading ?? false,
            totalItems: data?.total ?? 0,
            error: data?.error ?? null,
        })
    );
};


// 2. Cache selector theo storeKey + giới hạn kích thước cache
const MAX_CACHE_SIZE = 100;
const proByCategoryIdSelectorsCache: Record<string, ReturnType<typeof makeSelectProByCategoryIdState>> = {};
const cacheKeys: string[] = [];

/**
 * Lấy selector đã cache theo storeKey hoặc tạo mới nếu chưa có.
 * Tự động giới hạn cache tối đa MAX_CACHE_SIZE selector.
 */
export const selectProByCategoryIdByStoreKey = (storeKey: string) => {
    if (!proByCategoryIdSelectorsCache[storeKey]) {
        // Tạo selector mới và lưu vào cache
        proByCategoryIdSelectorsCache[storeKey] = makeSelectProByCategoryIdState(storeKey);
        cacheKeys.push(storeKey);

        // Xoá cache cũ nếu quá giới hạn
        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete proByCategoryIdSelectorsCache[oldestKey];
            }
        }
    }

    return proByCategoryIdSelectorsCache[storeKey];
};
