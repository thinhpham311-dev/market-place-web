import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/features/category/by-category-id/services'
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

export const getCatListById = createAsyncThunk<
    CategoriesResponse,
    { category_id: string },
    { rejectValue: unknown }
>(
    'catByCategoryId/data/getCatListById',
    async ({ category_id }, { rejectWithValue }) => {
        try {
            const response = await apiPostCategoryDetail({ category_id } as Category) as {
                data: CategoriesResponse
            }
            return response.data
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const dataSlice = createSlice({
    name: 'catByCategoryId/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatListById.fulfilled, (state: {
                list: Category[] | [];
                loading: boolean
            }, action: { payload: any }) => {
                state.list = action.payload.metadata
                state.loading = false;
            })

            .addCase(getCatListById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCatListById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch categories';
                state.list = [];
            });
    }
});

export default dataSlice.reducer