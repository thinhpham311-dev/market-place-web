import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { SORT } from "@/features/common/sort/constants"

export const makeSelectSortState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${SORT}_${storeKey}`] ? state[`${SORT}_${storeKey}`].state : null,
        (sortState) => ({
            sortBy: sortState ? sortState.sortBy : { label: 'Newest', value: 'ctime' }
        })
    );

const sortSelectorsCache: Record<string, ReturnType<typeof makeSelectSortState>> = {};

export const selectSortByStoreKey = (storeKey: string) => {
    if (!sortSelectorsCache[storeKey]) {
        sortSelectorsCache[storeKey] = makeSelectSortState(storeKey);
    }
    return sortSelectorsCache[storeKey];
};