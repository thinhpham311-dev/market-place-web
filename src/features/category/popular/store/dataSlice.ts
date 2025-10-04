import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostCategoriesList } from '@/features/category/popular/services';
import { ICategory } from '@/interfaces/category';
import { smartCacheFetch } from "@/store/api/helpers";
import { RootState } from '@/store';

type CategoriesResponse = {
    metadata: {
        list: ICategory[],
        total: number
    };
};


interface ICategoryState {
    loading: boolean;
    error: string | null;
    list: ICategory[];
    total?: number
}

const initialState: ICategoryState = {
    loading: false,
    error: null,
    list: [],
    total: 0
};


export const getCategoryList = createAsyncThunk<CategoriesResponse, object, { rejectValue: string; state: RootState }>(
    'catPopularList/data/getList',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const cacheKey = "catPopularList"
            const data = await smartCacheFetch<object, CategoriesResponse>(
                cacheKey,
                {},
                async () => {
                    const res = await apiPostCategoriesList();
                    return res as { data: CategoriesResponse };
                },
                getState,
                dispatch,
                { TTL: 5 * 60 * 1000, retries: 2, retryDelay: 500, tags: ["catPopularList"] }
            );
            return data;

        } catch (err: any) {
            return rejectWithValue(err?.message || 'Unknown error');
        }
    });


const dataSlice = createSlice({
    name: 'catPopularList/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list
                state.total = total
                state.loading = false;
                state.error = null;
            })
            .addCase(getCategoryList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch categories';
                state.total = 0;
                state.list = [];
            });
    }
});

export default dataSlice.reducer;
