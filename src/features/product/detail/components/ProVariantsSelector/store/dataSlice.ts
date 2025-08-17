import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSearchProductVariant } from '../services';
import { Product } from '@/features/product/types';


type ProductDetailResponse = {
    metadata: Product
};

export const getSkuProByVariants = createAsyncThunk<ProductDetailResponse, Product>(
    'variant/data/getSkuProByVariants',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostSearchProductVariant(params) as { data: ProductDetailResponse }
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


const variantSlice = createSlice({
    name: 'variant/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSkuProByVariants.pending, (state) => {
                state.product = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(getSkuProByVariants.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.product = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getSkuProByVariants.rejected, (state) => {
                state.product = null;
                state.loading = false;
                state.status = "error";
            });
    },
});

export default variantSlice.reducer;
