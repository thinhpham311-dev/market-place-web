import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/related/services'
import { IFilter, ISpuPro } from '@/interfaces/spu';
import {
    PRO_RELATED_LIST_CACHE_KEY,
    PRO_RELATED_LIST_RETRY_DELAY,
    PRO_RELATED_LIST_RETRIES,
    PRO_RELATED_LIST_TTL,
    PRO_RELATED_LIST_TAG
} from "@/features/product/list/related/constants";

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};

export const getProductList = createAsyncThunk<ProductListResponse, IFilter>(
    'proRelatedList/data/getList',
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



interface IProductState {
    loading: boolean;
    error: string | null;
    list: ISpuPro[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    list: [],
    total: 0,
    error: null
}

const dataSlice = createSlice({
    name: 'proRelatedList/data',
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