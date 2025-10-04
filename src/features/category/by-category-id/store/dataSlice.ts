import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/features/category/by-category-id/services'
import { ICategory } from '@/interfaces/category';
import { RootState } from '@/store';
import { smartCacheFetch } from "@/store/api/helpers";

type CategoriesResponse = {
    metadata: {
        list: ICategory[]
        total?: number
    };
};


interface ICategoryState {
    loading: boolean;
    error: string | null;
    total?: number;
    list: ICategory[];
}

const initialState: ICategoryState = {
    loading: false,
    error: null,
    total: 0,
    list: [],
};

export const getCatListById = createAsyncThunk<
    CategoriesResponse,
    ICategory,
    { rejectValue: string; state: RootState }
>(
    'catByCategoryId/data/getCatListById',
    async (params, { rejectWithValue, getState, dispatch }) => {
        try {
            const cacheKey = "catByCategoryId"
            const data = await smartCacheFetch<ICategory, CategoriesResponse>(
                cacheKey,
                params,
                async (p) => {
                    const res = await apiPostCategoryDetail(p);
                    return res as { data: CategoriesResponse };
                },
                getState,
                dispatch,
                { TTL: 5 * 60 * 1000, retries: 2, retryDelay: 500, tags: ["catByCategoryId"] }
            );
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