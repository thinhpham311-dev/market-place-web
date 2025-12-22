import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsListByCategories } from '@/features/product/list/by-category-id/services';
import {
    PRO_LIST_BY_CATEGORYID_CACHE_KEY,
    PRO_LIST_BY_CATEGORYID_RETRY_DELAY,
    PRO_LIST_BY_CATEGORYID_RETRIES,
    PRO_LIST_BY_CATEGORYID_TTL,
    PRO_LIST_BY_CATEGORYID_TAG
} from "@/features/product/list/by-category-id/constants";
import { IProductListRequest, IProductListResponse } from "@/features/product/list/by-category-id/interfaces"
import { initialState } from "./initials"


export const getProductListByCategories = createAsyncThunk<IProductListResponse, IProductListRequest>(
    'proListByCategoryId/data/getList',
    async (params: IProductListRequest, { rejectWithValue, dispatch }) => {
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
            }) as unknown as IProductListResponse;

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
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductListByCategories.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductListByCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer;
