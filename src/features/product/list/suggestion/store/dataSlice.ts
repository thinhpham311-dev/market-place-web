import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsList } from '@/features/product/list/suggestion/services';
import { ISpuPro, IFilter } from '@/interfaces/spu';

import {
    PRO_SUGGESTION_LIST_CACHE_KEY,
    PRO_SUGGESTION_LIST_RETRY_DELAY,
    PRO_SUGGESTION_LIST_RETRIES,
    PRO_SUGGESTION_LIST_TTL,
    PRO_SUGGESTION_LIST_TAG
} from "@/features/product/list/suggestion/constants";


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



export const getProductList = createAsyncThunk<ProductListResponse, IFilter, { rejectValue: IErrorPayload | string }>(
    'proSuggestionList/data/getList',
    async (params: IFilter, { rejectWithValue, dispatch }) => {
        try {

            const data = await dispatch({
                type: "api/fetch",
                payload: {
                    key: PRO_SUGGESTION_LIST_CACHE_KEY,
                    params,
                    apiFn: apiPostProductsList,
                    options: {
                        TTL: PRO_SUGGESTION_LIST_TTL,
                        retries: PRO_SUGGESTION_LIST_RETRIES,
                        retryDelay: PRO_SUGGESTION_LIST_RETRY_DELAY,
                        tags: [PRO_SUGGESTION_LIST_TAG],
                    },
                },
            }) as unknown as ProductListResponse;

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

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
