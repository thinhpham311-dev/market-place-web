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
            const response = await apiPostProductDetail(params) as { data: ProductDetailResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

interface IProductDetailState {
    loading: boolean;
    product: Product | null;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: IProductDetailState = {
    loading: false,
    product: null,
    status: "idle",
    error: null
};


const dataSlice = createSlice({
    name: 'detail/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetail.pending, (state) => {
                state.product = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.product = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getProductDetail.rejected, (state) => {
                state.product = null;
                state.loading = false;
                state.status = "error";
            });
    },
});

export default dataSlice.reducer;
