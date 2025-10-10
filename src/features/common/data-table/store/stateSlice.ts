// features/cartTable/dataTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState,
    ExpandedState
} from '@tanstack/react-table'

// Types
export interface DataTableState {
    grouping: GroupingState
    columnVisibility: VisibilityState
    expanded: ExpandedState
}

// Initial state
const initialState: DataTableState = {
    grouping: ['itemShopId'],
    columnVisibility: {
        itemShopId: false,
    },
    expanded: {},
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
    },
})

export const {
    setGrouping,
    setColumnVisibility,
    setExpanded,
} = dataTableSlice.actions


export default dataTableSlice.reducer