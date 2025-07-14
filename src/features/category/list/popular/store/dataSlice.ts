import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoriesList } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/category';

export const getCategoryList = createAsyncThunk<ICategory[]>('catPopularList/data/getList', async () => {
    const response = await apiPostCategoriesList() as { data: ICategory[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'catPopularList/data',
    initialState: {
        loading: false,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state: { list: ICategory[]; loading: boolean }, action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getCategoryList.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getCategoryList.rejected, (state: { list: ICategory[]; loading: boolean }) => {
                state.loading = false; // handle rejection gracefully
                state.list = [];
            });
    }
});

export default dataSlice.reducer