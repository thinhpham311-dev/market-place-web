import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { INFINITE_SCROLL } from "@/features/common/infinite-scroll/constants"

export const makeSelectInfiniteScrollState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${INFINITE_SCROLL}_${storeKey}`] ? state[`${INFINITE_SCROLL}_${storeKey}`].state : null,
        (infiniteScrollState) => ({
            currentPage: infiniteScrollState?.currentPage ?? 1,
            totalPages: infiniteScrollState?.totalPages ?? 1,
            limit: infiniteScrollState?.limit ?? 10,
        })
    );

const infiniteScrollSelectorsCache: Record<string, ReturnType<typeof makeSelectInfiniteScrollState>> = {};

export const selectInfiniteScrollByStoreKey = (storeKey: string) => {
    if (!infiniteScrollSelectorsCache[storeKey]) {
        infiniteScrollSelectorsCache[storeKey] = makeSelectInfiniteScrollState(storeKey);
    }
    return infiniteScrollSelectorsCache[storeKey];
};