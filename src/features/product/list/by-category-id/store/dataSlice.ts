import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsListByCategories } from '@/features/product/list/by-category-id/services';
import { IFilter, ISpuPro } from '@/interfaces/spu';
import {
    PRO_LIST_BY_CATEGORYID_CACHE_KEY,
    PRO_LIST_BY_CATEGORYID_RETRY_DELAY,
    PRO_LIST_BY_CATEGORYID_RETRIES,
    PRO_LIST_BY_CATEGORYID_TTL,
    PRO_LIST_BY_CATEGORYID_TAG
} from "@/features/product/list/by-category-id/constants";

type ProductListResponse = {
    metadata: {
        list: ISpuPro[],
        total: number;
    },
};

interface IProductState {
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "success" | "error" | "empty";
    list: ISpuPro[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    status: "idle",
    list: [],
    total: 0,
    error: null
};

export const getProductListByCategories = createAsyncThunk<ProductListResponse, IFilter>(
    'proListByCategoryId/data/getList',
    async (params: IFilter, { rejectWithValue, dispatch }) => {
        try {
            const data = await dispatch({
                type: "api/fetch",
                payload: {
                    key: PRO_LIST_BY_CATEGORYID_CACHE_KEY,
                    params,
                    apiFn: apiPostProductsListByCategories,
                    options: {
                        TTL: PRO_LIST_BY_CATEGORYID_TTL,
                        retries: PRO_LIST_BY_CATEGORYID_RETRIES,
                        retryDelay: PRO_LIST_BY_CATEGORYID_RETRY_DELAY,
                        tags: [PRO_LIST_BY_CATEGORYID_TAG],
                    },
                },
            }) as unknown as ProductListResponse;

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);


const dataSlice = createSlice({
    name: 'proListByCategoryId/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductListByCategories.pending, (state) => {
                state.status = "loading";
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductListByCategories.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
                state.status = list.length > 0 ? "success" : "empty";
            })
            .addCase(getProductListByCategories.rejected, (state, action) => {
                state.loading = false;
                state.status = "error";
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer;
