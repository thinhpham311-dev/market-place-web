import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Sort } from '../types';

interface SortState {
    sortBy: Sort;
}

const initialState: SortState = {
    sortBy: { label: 'Newest', value: 'ctime' },
};

const stateSlice = createSlice({
    name: 'sort/state',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<Sort>) => {
            state.sortBy = action.payload;
        },
        resetSortBy: (state) => {
            state.sortBy = initialState.sortBy;
        },
    },
});

export const { setSortBy, resetSortBy } = stateSlice.actions;
export default stateSlice.reducer;
