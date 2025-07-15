import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsListByCategories } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/features/product/types';

type ProductListResponse = {
    metadata:
    {
        list: IProduct[],
        total: number;
    };
};

export const getProductListByCategories = createAsyncThunk<ProductListResponse, IProductfilter>(
    'proListByCategoryId/data/getList',
    async (params: IProductfilter) => {
        const response = await apiPostProductsListByCategories(params) as
            {
                data: {
                    metadata: {
                        list: IProduct[],
                        total: number
                    }
                }
            };
        return response.data;
    });


const dataSlice = createSlice({
    name: 'proListByCategoryId/data',
    initialState: {
        loading: false,
        detail: null,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductListByCategories.fulfilled, (state: { list: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductListByCategories.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductListByCategories.rejected, (state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false;
                state.list = [];
            });
    }
});

export default dataSlice.reducer