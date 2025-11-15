// features/cartTable/dataTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState,
    ExpandedState,
    SortingState
} from '@tanstack/react-table'

// Types
export interface DataTableState {
    grouping: GroupingState
    columnVisibility: VisibilityState
    expanded: ExpandedState
    sorting: SortingState
}

// Initial state
const initialState: DataTableState = {
    grouping: ['itemShopId'],
    columnVisibility: {
        itemShopId: false,
    },
    expanded: {},
    sorting: []
}

// Slice
const dataTableSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        setGrouping: (state, action: PayloadAction<GroupingState>) => {
            state.grouping = action.payload
        },

        setColumnVisibility: (state, action: PayloadAction<VisibilityState>) => {
            state.columnVisibility = action.payload
        },

        setExpanded: (state, action: PayloadAction<ExpandedState>) => {
            state.expanded = action.payload
        },

        setSorting: (state, action: PayloadAction<SortingState>) => {
            state.sorting = action.payload
        }
    },
})

export const {
    setGrouping,
    setColumnVisibility,
    setExpanded,
    setSorting
} = dataTableSlice.actions


export default dataTableSlice.reducer