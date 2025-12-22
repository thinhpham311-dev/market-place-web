import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/features/category/list/by-category-id/services'
import { ICategoryModel } from '@/models/category';
import {
    CAT_LIST_BY_ID_CACHE_KEY,
    CAT_LIST_BY_ID_RETRY_DELAY,
    CAT_LIST_BY_ID_RETRIES,
    CAT_LIST_BY_ID_TTL,
    CAT_LIST_BY_ID_TAG
} from "@/features/category/list/by-category-id/constants";

type CategoriesResponse = {
    metadata: {
        list: ICategoryModel[]
        total?: number
    };
};


interface ICategoryState {
    loading: boolean;
    error: string | null;
    total?: number;
    list: ICategoryModel[];
}

const initialState: ICategoryState = {
    loading: false,
    error: null,
    total: 0,
    list: [],
};

export const getCatListById = createAsyncThunk<
    CategoriesResponse,
    ICategoryModel,
    { rejectValue: string; }
>(
    'catByCategoryId/data/getCatListById',
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const data = await dispatch({
                type: "api/fetch",
                payload: {
                    key: CAT_LIST_BY_ID_CACHE_KEY,
                    params,
                    apiFn: apiPostCategoryDetail,
                    options: {
                        TTL: CAT_LIST_BY_ID_TTL,
                        retries: CAT_LIST_BY_ID_RETRIES,
                        retryDelay: CAT_LIST_BY_ID_RETRY_DELAY,
                        tags: [CAT_LIST_BY_ID_TAG],
                    },
                },
            }) as unknown as CategoriesResponse;

            return data;


        } catch (err: any) {
            return rejectWithValue(err?.message || 'Unknown error');
        }
    }
);

const dataSlice = createSlice({
    name: 'catByCategoryId/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatListById.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata
                state.list = list
                state.total = total;
                state.loading = false;
            })

            .addCase(getCatListById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCatListById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch categories';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer