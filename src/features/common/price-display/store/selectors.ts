import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants"

export const makeSelectPriceDisplayState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${PRICE_DISPLAY}_${storeKey}`] ? state[`${PRICE_DISPLAY}_${storeKey}`].state : null,
        (priceState) => ({
            currentPrice: priceState?.currentPrice,
            minPrice: priceState?.minPrice,
            maxPrice: priceState?.maxPrice,
            flashSalePrice: priceState?.flashSalePrice,
            defaultPrice: priceState?.defaultPrice,
            loading: priceState?.loading,
            error: priceState?.error,
        })
    );

const priceDisplaySelectorsCache: Record<string, ReturnType<typeof makeSelectPriceDisplayState>> = {};

export const selectPriceDisplayByStoreKey = (storeKey: string) => {
    if (!priceDisplaySelectorsCache[storeKey]) {
        priceDisplaySelectorsCache[storeKey] = makeSelectPriceDisplayState(storeKey);
    }
    return priceDisplaySelectorsCache[storeKey];
};