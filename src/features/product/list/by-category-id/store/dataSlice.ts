import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsListByCategories } from '@/features/product/list/by-category-id/services'
import { Productfilter, Product } from '@/features/product/types';

type ProductListResponse = {
    metadata:
    {
        list: Product[],
        total: number;
    };
};

interface IProductState {
    loading: boolean;
    error: string | null;
    list: Product[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    list: [],
    total: 0,
    error: null
}

export const getProductListByCategories = createAsyncThunk<ProductListResponse, Productfilter>(
    'proListByCategoryId/data/getList',
    async (params: Productfilter) => {
        const response = await apiPostProductsListByCategories(params) as
            {
                data: {
                    metadata: {
                        list: Product[],
                        total: number
                    }
                }
            };
        return response.data;
    });


const dataSlice = createSlice({
    name: 'proListByCategoryId/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductListByCategories.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductListByCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductListByCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer