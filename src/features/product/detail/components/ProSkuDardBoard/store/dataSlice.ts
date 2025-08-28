import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSearchProductVariant } from '../services';
import { SkuPro } from '../types';
import { Product } from '@/features/product/types';

type ProductVariantResponse = {
    metadata: SkuPro
};

export const getSkuProByVariants = createAsyncThunk<ProductVariantResponse, Product>(
    'variant/data/getSkuProByVariants',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostSearchProductVariant(params) as { data: ProductVariantResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

interface IProductVariantState {
    loading: boolean;
    skuProData: SkuPro | null;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: IProductVariantState = {
    loading: false,
    skuProData: null,
    status: "idle",
    error: null
};


const dataSlice = createSlice({
    name: 'sku/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSkuProByVariants.pending, (state) => {
                state.skuProData = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(getSkuProByVariants.fulfilled, (state, action) => {
                const skuPro = action.payload.metadata;
                state.skuProData = skuPro;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getSkuProByVariants.rejected, (state) => {
                state.skuProData = null;
                state.loading = false;
                state.status = "error";
            });
    },
});

export default dataSlice.reducer;
