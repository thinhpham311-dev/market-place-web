// features/cartTable/dataTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState
} from '@tanstack/react-table'

// Types
export interface IDataTable {
    grouping: GroupingState
    columnVisibility: VisibilityState
}

const DEFAULT_VALUE: IDataTable = {
    grouping: ['itemShopId'],
    columnVisibility: {
        itemShopId: false,
    },
};


interface IState {
    [storeKey: string]: IDataTable;
}

const initialState: IState = {};


// Slice
const dataTableSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        setInitialState: (
            state,
            action: PayloadAction<{ storeKey: string }>
        ) => {
            const { storeKey } = action.payload;
            state[storeKey] = DEFAULT_VALUE
        },
        setGrouping: (state, action: PayloadAction<{ storeKey: string; grouping: GroupingState }>) => {
            const { storeKey, grouping } = action.payload
            state[storeKey].grouping = grouping
        },

        setColumnVisibility: (state, action: PayloadAction<{ storeKey: string; columnVisibility: VisibilityState }>) => {
            const { storeKey, columnVisibility } = action.payload
            state[storeKey].columnVisibility = columnVisibility
        }
    },
})

export const {
    setInitialState,
    setGrouping,
    setColumnVisibility
} = dataTableSlice.actions


export default dataTableSlice.reducer