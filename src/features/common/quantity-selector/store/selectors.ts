import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { QUANTITY_COUNTER } from "../constants";

export const makeSelectQuantitySelectorState = (reducerKey: string, storeKey: string) =>
    createSelector(
        (state: RootState) =>
            state[`${QUANTITY_COUNTER}_${reducerKey}`]?.state[storeKey] ?? null,
        (quantityState) => ({
            currentQuantity: quantityState?.currentQuantity ?? 1,
            errorMessages: quantityState?.errorMessages ?? []
        })
    );

const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectQuantitySelectorState>>
> = {};

export const selectQuantitySelector = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectQuantitySelectorState(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};
