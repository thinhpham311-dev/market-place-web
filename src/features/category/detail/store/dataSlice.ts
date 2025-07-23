import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/services/CategoryService'
import { ICategory } from '@/features/category/types';


type CategoriesResponse = {
    metadata: ICategory[];
};

export const getCatListById = createAsyncThunk<
    CategoriesResponse,
    { _id: string },
    { rejectValue: unknown }
>(
    'catByCategoryId/data/getCatListById',
    async ({ _id }, { rejectWithValue }) => {
        try {
            const response = await apiPostCategoryDetail({ _id } as ICategory) as {
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
    initialState: {
        loading: false,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCatListById.fulfilled, (state: {
                data: ICategory[] | [];
                loading: boolean
            }, action: { payload: any }) => {
                state.data = action.payload.metadata
                state.loading = false;
            })

            .addCase(getCatListById.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getCatListById.rejected, (state: { data: ICategory[] | null; loading: boolean }) => {
                state.loading = false;
                state.data = [];
            });
    }
});

export default dataSlice.reducer