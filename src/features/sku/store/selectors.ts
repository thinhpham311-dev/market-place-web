import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { SKU_KEY } from "@/features/sku/constants";


export const makeSelectSkuDetailState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${SKU_KEY}_${storeKey}`]?.data ?? null,
        (data) => ({
            sku: data?.sku,
            loading: data?.loading,
            status: data?.status,
            error: data?.error,
        })
    );


const MAX_CACHE_SIZE = 100;
const skuDetailSelectorsCache: Record<string, ReturnType<typeof makeSelectSkuDetailState>> = {};

const cacheKeys: string[] = [];

export const selectSkuDetailByStoreKey = (storeKey: string) => {
    if (!skuDetailSelectorsCache[storeKey]) {
        skuDetailSelectorsCache[storeKey] = makeSelectSkuDetailState(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete skuDetailSelectorsCache[oldestKey];
            }
        }
    }

    return skuDetailSelectorsCache[storeKey];
};

