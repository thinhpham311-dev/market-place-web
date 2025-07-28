import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { FILTER } from "@/features/common/filter/constants"

export const makeSelectFilterState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${FILTER}_${storeKey}`] ? state[`${FILTER}_${storeKey}`].state : null,
        (filterState) => ({
            filter: filterState ? filterState.filter : {},
            data: filterState ? filterState.data : []
        })
    );

const filterSelectorsCache: Record<string, ReturnType<typeof makeSelectFilterState>> = {};

export const selectFilterStoreKey = (storeKey: string) => {
    if (!filterSelectorsCache[storeKey]) {
        filterSelectorsCache[storeKey] = makeSelectFilterState(storeKey);
    }
    return filterSelectorsCache[storeKey];
};