import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoriesList } from '@/services/CategoryService'
import { IProduct } from '@/interfaces/product';

export const getProductList = createAsyncThunk<IProduct[]>('productList/getList', async () => {
    const response = await apiPostCategoriesList() as { data: IProduct[] };
    return response.data;
});


const dataSlice = createSlice({
    name: 'productList/data',
    initialState: {
        loading: false,
        productList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.fulfilled, (state: { productList: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.productList = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductList.pending, (state: { loading: boolean }) => {
                state.loading = true;
            });
    }
});

export default dataSlice.reducer