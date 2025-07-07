import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/interfaces/product';

export const getProductList = createAsyncThunk<IProduct[], IProductfilter>('categoryList/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsList(data) as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'categoryList/data',
    initialState: {
        loading: false,
        categoryList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.fulfilled, (state: { categoryList: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.categoryList = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductList.pending, (state: { loading: boolean }) => {
                state.loading = true;
            });
    }
});

export default dataSlice.reducer