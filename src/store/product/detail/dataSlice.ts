import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductDetail } from '@/services/ProductService';
import { IProduct } from '@/features/product/types';

interface ProductDetailState {
    loading: boolean;
    detail: IProduct | null;
}

const initialState: ProductDetailState = {
    loading: false,
    detail: null,
};

export const getProductDetail = createAsyncThunk<IProduct, IProduct>(
    'productDetail/data/getDetail',
    async (data) => {
        const response = await apiPostProductDetail(data) as { data: IProduct };
        return response.data;
    }
);

const dataSlice = createSlice({
    name: 'productDetail/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductDetail.fulfilled, (state: { detail: IProduct | null; loading: boolean }, action: { payload: any }) => {
                state.detail = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductDetail.rejected, (state) => {
                state.loading = false;
                state.detail = null;
            });
    },
});

export default dataSlice.reducer;
