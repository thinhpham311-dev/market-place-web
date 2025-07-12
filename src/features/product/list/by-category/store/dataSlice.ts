import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsListByCategories } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/interfaces/product';

export const getProductListByCategories = createAsyncThunk<IProduct[], IProductfilter>('productListByCategories/data/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsListByCategories(data) as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'productListByCategories/data',
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