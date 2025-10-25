import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const makeSelectAddItemInCart = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[storeKey]?.cart ?? null,
        (data) => ({
            data: data?.data ?? {},
            status: data?.status,
            loading: data?.loading ?? false,
            error: data?.error ?? null,
        })

    );


const MAX_CACHE_SIZE = 100;
const cartSelectorsCache: Record<string, ReturnType<typeof makeSelectAddItemInCart>> = {};

const cacheKeys: string[] = [];

export const selectCartByStoreKey = (storeKey: string) => {
    if (!cartSelectorsCache[storeKey]) {
        cartSelectorsCache[storeKey] = makeSelectAddItemInCart(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete cartSelectorsCache[oldestKey];
            }
        }
    }

    return cartSelectorsCache[storeKey];
};

