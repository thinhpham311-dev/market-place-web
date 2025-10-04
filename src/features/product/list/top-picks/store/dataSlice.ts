import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/top-picks/services'
import { IFilter, ISpuPro } from '@/interfaces/spu';
import { smartCacheFetch } from "@/store/api/helpers";
import { RootState } from '@/store';

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};

interface IErrorPayload {
    message: string;
    [key: string]: any;
}


export const getProductList = createAsyncThunk<ProductListResponse, IFilter, { rejectValue: IErrorPayload | string, state: RootState }
>(
    'proTopPicksList/data/getList',
    async (params: IFilter, { rejectWithValue, getState, dispatch }) => {
        try {
            const cacheKey = `proTopPicksList`;

            const data = await smartCacheFetch<IFilter, ProductListResponse>(
                cacheKey,
                params,
                async (p) => {
                    const res = await apiPostProductsList(p);
                    return res as { data: ProductListResponse };
                },
                getState,
                dispatch,
                { TTL: 5 * 60 * 1000, retries: 2, retryDelay: 500, tags: ["proTopPicksList"] }

            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });

interface ProductState {
    list: ISpuPro[];
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
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer