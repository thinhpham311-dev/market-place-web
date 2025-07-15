import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/features/product/types';

export const getProductList = createAsyncThunk<IProduct[], IProductfilter>('proPopularList/data/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsList(data) as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'proPopularList/data',
    initialState: {
        loading: false,
        list: [],
        total: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (state: { list: IProduct[]; loading: boolean, total: number }, action: { payload: any }) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductList.rejected, (state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false; // handle rejection gracefully
                state.list = [];
            });
    }
});

export default dataSlice.reducer