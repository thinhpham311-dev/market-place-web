// features/cartTable/dataTableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    GroupingState,
    VisibilityState
} from '@tanstack/react-table'
import { initialState, createDefault, IDataTable } from "@/features/common/data-table/store/initial"


// Slice
const dataTableSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        setInitialState: (
            state,
            action: PayloadAction<{ storeKey: string, initialValue: IDataTable }>
        ) => {
            const { storeKey, initialValue } = action.payload;

            if (!state[storeKey]) {
                state[storeKey] = initialValue
                    ? { ...initialValue }
                    : createDefault();
            }
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