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
    'proPopularList/data/getList',
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
    name: 'proPopularList/data',
    initialState: {
        loading: false,
        list: [],
        total: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (
                state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (
                state: { list: IProduct[]; loading: boolean, total: number },
                action: { payload: ProductListResponse }) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductList.rejected, (
                state: { list: IProduct[]; total: number; loading: boolean }) => {
                state.loading = false;
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer