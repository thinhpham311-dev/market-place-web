import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostCategoriesList } from '@/features/category/popular/services';
import { Category } from '@/features/category/types';

type CategoriesResponse = {
    metadata: Category[];
};


interface CategoryState {
    loading: boolean;
    error: string | null;
    list: Category[];
}

const initialState: CategoryState = {
    loading: false,
    error: null,
    list: [],
};

export const getCategoryList = createAsyncThunk<CategoriesResponse>(
    'catPopularList/data/getList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiPostCategoriesList() as { data: CategoriesResponse };
            return response.data
        } catch (err: any) {
            return rejectWithValue(err?.message || 'Unknown error');
        }
    }
);



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
                state.list = action.payload.metadata;
                state.loading = false;
                state.error = null;
            })
            .addCase(getCategoryList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch categories';
                state.list = [];
            });
    }
});

export default dataSlice.reducer;
