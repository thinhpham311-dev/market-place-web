import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { PAGINATION } from "@/features/common/pagination/constants"

export const makeSelectPaginationState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${PAGINATION}_${storeKey}`] ? state[`${PAGINATION}_${storeKey}`].state : null,
        (paginationState) => ({
            currentPage: paginationState?.currentPage,
            totalPages: paginationState?.totalPages,
            limit: paginationState?.limit,
        })
    );

const paginationSelectorsCache: Record<string, ReturnType<typeof makeSelectPaginationState>> = {};

export const selectPaginationByStoreKey = (storeKey: string) => {
    if (!paginationSelectorsCache[storeKey]) {
        paginationSelectorsCache[storeKey] = makeSelectPaginationState(storeKey);
    }
    return paginationSelectorsCache[storeKey];
};