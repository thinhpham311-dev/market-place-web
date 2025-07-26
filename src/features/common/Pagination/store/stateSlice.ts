import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICommon {
    limit: number;
    currentPage: number;
    totalPages: number;
}

export const initialState: ICommon = {
    limit: 15,
    currentPage: 0,
    totalPages: 0,
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
            state.currentPage = 0;
            state.totalPages = 0;
            state.limit = 15;
        },
    },
});

export const { setPage, setTotalPages, setLimit, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
