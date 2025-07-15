import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/services/CategoryService'
import { ICategory } from '@/features/category/types';

export const getCatListById = createAsyncThunk<ICategory, ICategory>('catByCategoryId/data/getCatListById', async (data) => {
    const response = await apiPostCategoryDetail(data) as { data: ICategory };
    return response.data;
});

const dataSlice = createSlice({
    name: 'catByCategoryId/data',
    initialState: {
        loading: false,
        detail: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatListById.fulfilled, (state: {
                detail: ICategory | null; loading: boolean
            }, action: { payload: any }) => {
                state.detail = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getCatListById.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getCatListById.rejected, (state: { detail: ICategory | null; loading: boolean }) => {
                state.loading = false;
                state.detail = null;
            });
    }
});

export default dataSlice.reducer