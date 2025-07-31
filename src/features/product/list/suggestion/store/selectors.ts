import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProSuggestionListState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[storeKey]?.data ?? null,
        (data) => ({
            products: data?.list,
            loading: data?.loading,
            totalItems: data?.total,
            error: data?.error,
        })
    );


const MAX_CACHE_SIZE = 100;
const proSuggestionListSelectorsCache: Record<string, ReturnType<typeof makeSelectProSuggestionListState>> = {};
const cacheKeys: string[] = [];

export const selectProSuggestionListByStoreKey = (storeKey: string) => {
    if (!proSuggestionListSelectorsCache[storeKey]) {
        proSuggestionListSelectorsCache[storeKey] = makeSelectProSuggestionListState(storeKey);
        cacheKeys.push(storeKey);

        // Xóa cache cũ nếu vượt quá giới hạn
        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) delete proSuggestionListSelectorsCache[oldestKey];
        }
    }

    return proSuggestionListSelectorsCache[storeKey];
};
