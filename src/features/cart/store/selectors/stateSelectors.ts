import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { ITEM_IN_CART } from "@/features/cart/constants";

export const makeSelectCartState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${ITEM_IN_CART}_${storeKey}`]?.state ?? null,
        (state) => ({
            items: state?.items,
            itemsCount: state?.items.length,
            totalQuantity: state?.totalQuantity,
            totalAmount: state?.totalAmount,
            totalAmountDiscount: state?.totalAmountDiscount,
            totalSelectItems: state?.totalSelectItems,
            total: state?.total,
            estimatedShipping: state?.estimatedShipping,
            estimatedTax: state?.estimatedTax,
            selectedItems: state?.selectedItems,
        })
    );


const MAX_CACHE_SIZE = 100;
const cartStateSelectorsCache: Record<string, ReturnType<typeof makeSelectCartState>> = {};

const cacheKeys: string[] = [];

export const selectCartStateByStoreKey = (storeKey: string) => {
    if (!cartStateSelectorsCache[storeKey]) {
        cartStateSelectorsCache[storeKey] = makeSelectCartState(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete cartStateSelectorsCache[oldestKey];
            }
        }
    }

    return cartStateSelectorsCache[storeKey];
};

