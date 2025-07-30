import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductDetail } from '@/features/product/detail/services';
import { Product } from '@/features/product/types';



type ProductDetailResponse = {
    metadata: Product
};

export const getProductDetail = createAsyncThunk<ProductDetailResponse, Product>(
    'detail/data/getDetail',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostProductDetail(params) as {
                data: {
                    metadata: Product
                }
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

interface IProductDetailState {
    loading: boolean;
    detail: Product | null;
}

const initialState: IProductDetailState = {
    loading: false,
    detail: null,
};


const dataSlice = createSlice({
    name: 'detail/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductDetail.fulfilled, (state: { detail: Product | null; loading: boolean }, action: { payload: any }) => {
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
