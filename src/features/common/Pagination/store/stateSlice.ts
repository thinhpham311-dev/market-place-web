// store/filter/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICommon {
    page: number;
    limit: number;
    currentPage: number;
    totalPages: number;
}

const initialState: ICommon = {
    page: 1,
    limit: 12,
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
        resetPagination(state) {
            state.currentPage = 1;
            state.totalPages = 1;
        },
    },
});

export const { setPage, setTotalPages, resetPagination } = stateSlice.actions;
export default stateSlice.reducer;
