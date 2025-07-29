import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/search/services'
import { IProductfilter, IProduct } from '@/features/product/types';

type ProductListResponse = {
    metadata:
    {
        list: IProduct[],
        total: number;
    };
};

interface ProductState {
    list: IProduct[];
    loading: boolean;
    total: number;
    error: string | null;
}

const initialState: ProductState = {
    list: [],
    loading: false,
    total: 0,
    error: null
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
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer