import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectProSpuDetailState = (storeKey: string) =>
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
const proSpuDetailSelectorsCache: Record<string, ReturnType<typeof makeSelectProSpuDetailState>> = {};

const cacheKeys: string[] = [];

export const selectProDetailByStoreKey = (storeKey: string) => {
    if (!proSpuDetailSelectorsCache[storeKey]) {
        proSpuDetailSelectorsCache[storeKey] = makeSelectProSpuDetailState(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete proSpuDetailSelectorsCache[oldestKey];
            }
        }
    }

    return proSpuDetailSelectorsCache[storeKey];
};

