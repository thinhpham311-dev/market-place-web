import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { ITEM_IN_CART } from "@/features/cart/constants";

export const makeSelectAddItemData = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${storeKey}_${ITEM_IN_CART}`]?.data ?? null,
        (data) => ({
            cart: data?.item,
            loading: data?.loading,
            status: data?.status,
            error: data?.error,
        })
    );


const MAX_CACHE_SIZE = 100;
const cartDataSelectorsCache: Record<string, ReturnType<typeof makeSelectAddItemData>> = {};

const cacheKeys: string[] = [];

export const selectCartDataByStoreKey = (storeKey: string) => {
    if (!cartDataSelectorsCache[storeKey]) {
        cartDataSelectorsCache[storeKey] = makeSelectAddItemData(storeKey);
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

