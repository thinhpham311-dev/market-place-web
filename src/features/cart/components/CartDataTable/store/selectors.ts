import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { CART_DATA_TABLE } from "../constants";

export const makeSelectCartDataTableState = (storeKey: string) =>
    createSelector(
        (state: RootState) => state[`${CART_DATA_TABLE}_${storeKey}`]?.state ?? null,
        (cartTable) => ({
            grouping: cartTable?.grouping ?? [],
            expanded: cartTable?.expanded ?? {},
            columnVisibility: cartTable?.columnVisibility ?? {},
            rowSelection: cartTable?.rowSelection ?? {},
        })
    );


export const selectGrouping = (state: RootState) => state.cartTable.grouping
export const selectColumnVisibility = (state: RootState) => state.cartTable.columnVisibility
export const selectRowSelection = (state: RootState) => state.cartTable.rowSelection
export const selectExpanded = (state: RootState) => state.cartTable.expanded



const MAX_CACHE_SIZE = 100;
const cartDataTableStateSelectorsCache: Record<string, ReturnType<typeof makeSelectCartDataTableState>> = {};

const cacheKeys: string[] = [];

export const selectCartDataTableStateByStoreKey = (storeKey: string) => {
    if (!cartDataTableStateSelectorsCache[storeKey]) {
        cartDataTableStateSelectorsCache[storeKey] = makeSelectCartDataTableState(storeKey);
        cacheKeys.push(storeKey);

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            const oldestKey = cacheKeys.shift();
            if (oldestKey) {
                delete cartDataTableStateSelectorsCache[oldestKey];
            }
        }
    }

    return cartDataTableStateSelectorsCache[storeKey];
};

