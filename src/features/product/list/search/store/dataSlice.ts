import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/interfaces/product';

export const getProductList = createAsyncThunk<IProduct[], IProductfilter>('proSearchList/data/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsList(data) as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'proSearchList/data',
    initialState: {
        loading: false,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.fulfilled, (state: { list: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductList.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductList.rejected, (state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false; // handle rejection gracefully
                state.list = [];
            });
    }
});

export default dataSlice.reducer