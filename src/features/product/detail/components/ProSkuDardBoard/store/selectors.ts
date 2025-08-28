import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { PRO_SKU_DETAIL } from "../constants"


export const makeSelectProSku = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${PRO_SKU_DETAIL}_${storeKey}`]?.data ?? null,
        (data) => ({
            skuProData: data?.skuProData,
            loading: data?.loading,
            status: data?.status,
            error: data?.error,
        })
    );

const MAX_CACHE_SIZE = 100;
const proSkuSelectorsCache: Record<string, ReturnType<typeof makeSelectProSku>> = {};

const cacheKeys: string[] = [];

export const selectProSkuByStoreKey = (storeKey: string) => {
    if (!proSkuSelectorsCache[storeKey]) {
        proSkuSelectorsCache[storeKey] = makeSelectProSku(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete proSkuSelectorsCache[oldestKey];
            }
        }
    }
    return proSkuSelectorsCache[storeKey];
};