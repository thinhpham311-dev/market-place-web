// features/cartTable/dataTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState
} from '@tanstack/react-table'

// Types
export interface DataTableState {
    grouping: GroupingState
    columnVisibility: VisibilityState
}

// Initial state
const initialState: DataTableState = {
    grouping: ['itemShopId'],
    columnVisibility: {
        itemShopId: false,
    },
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
        }
    },
})

export const {
    setGrouping,
    setColumnVisibility
} = dataTableSlice.actions


export default dataTableSlice.reducer