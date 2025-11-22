import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPagination {
    limit: number;
    currentPage: number;
    totalPages: number;
}

export const initialState: IPagination = {
    limit: 0,
    currentPage: 1,
    totalPages: 1,
};

const stateSlice = createSlice({
    name: "pagination/state",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        resetPagination(state) {
            state.currentPage = initialState.currentPage;
            state.totalPages = initialState.totalPages;
            state.limit = initialState.limit;
        },
    },
});

export const { setPage, setTotalPages, setLimit, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
