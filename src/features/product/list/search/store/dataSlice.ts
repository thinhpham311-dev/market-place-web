import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/services/ProductService'
import { IProductfilter, IProduct } from '@/features/product/types';

type ProductListResponse = {
    metadata:
    {
        list: IProduct[],
        total: number;
    };
};


export const getProductList = createAsyncThunk<ProductListResponse, IProductfilter>(
    'proSearchList/data/getList',
    async (params: IProductfilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: {
                        metadata: {
                            list: IProduct[],
                            total: number
                        }
                    }
                };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });


const dataSlice = createSlice({
    name: 'proSearchList/data',
    initialState: {
        loading: false,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.fulfilled, (
                state: { list: IProduct[]; loading: boolean },
                action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductList.pending, (
                state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductList.rejected, (
                state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false;
                state.list = [];
            });
    }
});

export default dataSlice.reducer