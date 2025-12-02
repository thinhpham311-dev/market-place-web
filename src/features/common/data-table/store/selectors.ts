import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { DATA_TABLE } from "@/features/common/data-table/constants";

export const makeSelectDataTableState = (reducerKey: string, storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${DATA_TABLE}_${reducerKey}`]?.state[storeKey] ?? null,
        (dataTable) => ({
            grouping: dataTable?.grouping ?? [],
            columnVisibility: dataTable?.columnVisibility ?? {},
        })
    );


const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectDataTableState>>
> = {};


export const selectDataTableStoreKey = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectDataTableState(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};
