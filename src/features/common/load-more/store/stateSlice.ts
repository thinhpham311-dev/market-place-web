import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InfiniteScrollState {
    page: number;
    limit: number;
    totalItems: number;
}

const initialState: InfiniteScrollState = {
    page: 1,
    limit: 12,
    totalItems: 0,
};

const stateSlice = createSlice({
    name: "infiniteScroll",
    initialState,
    reducers: {
        nextPage: (state) => {
            const maxPage = Math.ceil(state.totalItems / state.limit);
            if (state.page < maxPage) {
                state.page += 1;
            }
        },
        resetPagination: () => initialState,
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const {
    nextPage,
    resetPagination,
    setTotalCount,
    setLimit,
    setPage,
} = stateSlice.actions;

export default stateSlice.reducer;
