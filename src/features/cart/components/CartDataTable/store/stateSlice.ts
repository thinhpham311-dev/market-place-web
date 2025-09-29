// features/cartTable/cartTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState,
    ExpandedState
} from '@tanstack/react-table'

// Types
export interface CartTableState {
    grouping: GroupingState
    columnVisibility: VisibilityState
    expanded: ExpandedState
}

// Initial state
const initialState: CartTableState = {
    grouping: ['itemShopId'],
    columnVisibility: {
        itemShopId: false,
    },
    expanded: {},
}

// Slice
const cartTableSlice = createSlice({
    name: 'cartTable',
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
} = cartTableSlice.actions


export default cartTableSlice.reducer