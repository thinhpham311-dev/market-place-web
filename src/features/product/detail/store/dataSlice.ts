import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductDetail } from '@/features/product/detail/services';
import { IProduct } from '@/features/product/types';



type ProductDetailResponse = {
    metadata: IProduct
};

export const getProductDetail = createAsyncThunk<ProductDetailResponse, IProduct>(
    'detail/data/getDetail',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostProductDetail(params) as {
                data: {
                    metadata: IProduct
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
    detail: IProduct | null;
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
