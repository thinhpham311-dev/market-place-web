import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/top-picks/services'
import { IFilter, ISpuPro } from '@/interfaces/spu';

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};


export const getProductList = createAsyncThunk<ProductListResponse, IFilter>(
    'proTopPicksList/data/getList',
    async (params: IFilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: ProductListResponse
                };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });



interface ProductState {
    list: ISpuPro[];
    loading: boolean;
    total: number;
    error: Error | null;
}

const initialState: ProductState = {
    list: [],
    loading: false,
    total: 0,
    error: null
};


const dataSlice = createSlice({
    name: 'proTopPicksList/data',
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
                state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer