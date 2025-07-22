import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortBy } from '../types';

interface SortState {
    sortBy: SortBy['sortBy'];
}

const initialState: SortState = {
    sortBy: 'ctime', // default sort
};

const sortSlice = createSlice({
    name: 'sort/state',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<NonNullable<SortBy['sortBy']>>) => {
            state.sortBy = action.payload;
        },
    },
});

export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
