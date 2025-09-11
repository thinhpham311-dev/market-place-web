import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { CART_DATA } from "@/features/cart/constants";

export const makeSelectCartData = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${storeKey}_${CART_DATA}`]?.data ?? null,
        (data) => ({
            item: data?.item,
            loading: data?.loading,
            status: data?.status,
            error: data?.error,
        })
    );


const MAX_CACHE_SIZE = 100;
const cartDataSelectorsCache: Record<string, ReturnType<typeof makeSelectCartData>> = {};

const cacheKeys: string[] = [];

export const selectCartDataByStoreKey = (storeKey: string) => {
    if (!cartDataSelectorsCache[storeKey]) {
        cartDataSelectorsCache[storeKey] = makeSelectCartData(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete cartDataSelectorsCache[oldestKey];
            }
        }
    }

    return cartDataSelectorsCache[storeKey];
};

