import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { DATA_TABLE } from "@/features/common/data-table/constants";

export const makeSelectDataTableState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${DATA_TABLE}_${storeKey}`]?.state ?? null,
        (dataTable) => ({
            grouping: dataTable?.grouping ?? [],
            expanded: dataTable?.expanded ?? {},
            columnVisibility: dataTable?.columnVisibility ?? {},
            rowSelection: dataTable?.rowSelection ?? {},
        })
    );



const MAX_CACHE_SIZE = 100;
const dataTableStateSelectorsCache: Record<string, ReturnType<typeof makeSelectDataTableState>> = {};

const cacheKeys: string[] = [];

export const selectDataTableStateByStoreKey = (storeKey: string) => {
    if (!dataTableStateSelectorsCache[storeKey]) {
        dataTableStateSelectorsCache[storeKey] = makeSelectDataTableState(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete dataTableStateSelectorsCache[oldestKey];
            }
        }
    }

    return dataTableStateSelectorsCache[storeKey];
};

