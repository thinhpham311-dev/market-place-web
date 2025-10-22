import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { QUANTITY_COUNTER } from "../constants"

export const makeSelectQuantitySelectorState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${QUANTITY_COUNTER}_${storeKey}`] ? state[`${QUANTITY_COUNTER}_${storeKey}`].state : null,
        (quantityState) => ({
            itemQuantity: quantityState?.currentQuantity,
            errorMessages: quantityState?.errorMessages,
        })
    );

const quantitySelectorSelectorsCache: Record<string, ReturnType<typeof makeSelectQuantitySelectorState>> = {};

export const selectQuantitySelectorByStoreKey = (storeKey: string) => {
    if (!quantitySelectorSelectorsCache[storeKey]) {
        quantitySelectorSelectorsCache[storeKey] = makeSelectQuantitySelectorState(storeKey);
    }
    return quantitySelectorSelectorsCache[storeKey];
};