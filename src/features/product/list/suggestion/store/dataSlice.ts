import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsList } from '@/features/product/list/suggestion/services';
import { ISpuPro, IFilter } from '@/interfaces/spu';
import { smartCacheFetch } from "@/store/api/helpers";
import { RootState } from '@/store';

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};

interface IProductState {
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
    list: ISpuPro[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    list: [],
    total: 0,
    status: "idle",
    error: null
}


export const getProductList = createAsyncThunk<ProductListResponse, IFilter, { state: RootState }>(
    'proSuggestionList/data/getList',
    async (params: IFilter, { rejectWithValue, getState, dispatch }) => {
        try {

            const cacheKey = "proSuggestionList"
            const data = await smartCacheFetch<IFilter, ProductListResponse>(
                cacheKey,
                params,
                async (p) => {
                    const res = await apiPostProductsList(p);
                    return res as { data: ProductListResponse };
                },
                getState,
                dispatch,
                { TTL: 5 * 60 * 1000, retries: 2, retryDelay: 500, tags: ["proSuggestionList"] }
            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);



const dataSlice = createSlice({
    name: 'proSuggestionList/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.status = "loading";
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
                state.status = "error";
            });
    },
});

export default dataSlice.reducer;
