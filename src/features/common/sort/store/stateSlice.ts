import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter } from '@/interfaces/filter';

interface SortState {
    sortBy: IFilter['sortBy'];
}

const initialState: SortState = {
    sortBy: 'popularity', // default sort
};

const sortSlice = createSlice({
    name: 'sort/state',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<NonNullable<IFilter['sortBy']>>) => {
            state.sortBy = action.payload;
        },
    },
});

export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
