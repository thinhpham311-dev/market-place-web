import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProDetailState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[storeKey]?.data ?? null,
        (data) => ({
            product: data?.product,
            loading: data?.loading,
            status: data?.status,
            error: data?.error,
        })
    );


const MAX_CACHE_SIZE = 100;
const proDetailSelectorsCache: Record<string, ReturnType<typeof makeSelectProDetailState>> = {};
const cacheKeys: string[] = [];

export const selectProDetailByStoreKey = (storeKey: string) => {
    if (!proDetailSelectorsCache[storeKey]) {
        proDetailSelectorsCache[storeKey] = makeSelectProDetailState(storeKey);
        cacheKeys.push(storeKey);

        // Xóa cache cũ nếu vượt quá giới hạn
        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) delete proDetailSelectorsCache[oldestKey];
        }
    }

    return proDetailSelectorsCache[storeKey];
};
