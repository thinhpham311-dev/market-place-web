import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsListByCategories } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/features/product/types';

export const getProductListByCategories = createAsyncThunk<IProduct[], IProductfilter>('proListByCategoryId/data/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsListByCategories(data) as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'proListByCategoryId/data',
    initialState: {
        loading: false,
        detail: null,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductListByCategories.fulfilled, (state: { list: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductListByCategories.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductListByCategories.rejected, (state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false;
                state.list = [];
            });
    }
});

export default dataSlice.reducer