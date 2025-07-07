import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoriesList } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/category';

export const getCategoryList = createAsyncThunk<ICategory[]>('categoryList/getList', async () => {
    const response = await apiPostCategoriesList() as { data: ICategory[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'categoryList/data',
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
            });
    }
});

export default dataSlice.reducer