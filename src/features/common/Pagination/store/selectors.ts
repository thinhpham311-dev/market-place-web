import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { PAGINATION } from "@/features/common/pagination/constants"

export const makeSelectPaginationState = (reducerKey: string, storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${PAGINATION}_${reducerKey}`]?.state[storeKey] ?? null,
        (paginationState) => ({
            currentPage: paginationState?.currentPage,
            totalPages: paginationState?.totalPages,
            limit: paginationState?.limit,
        })
    );


const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectPaginationState>>
> = {};


export const selectPaginationByStoreKey = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectPaginationState(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};
