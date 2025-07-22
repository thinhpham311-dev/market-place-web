import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostCategoryDetail } from '@/services/CategoryService'
import { ICategory } from '@/features/category/types';


type CategoriesResponse = {
    metadata: ICategory[];
    level: number;
};
export const getCatListById = createAsyncThunk<
    CategoriesResponse, // Return type
    { _id: string; level: number, isLeaf: boolean }, // Argument type
    { rejectValue: unknown }
>(
    'catByCategoryId/data/getCatListById',
    async ({ _id, level, isLeaf }, { rejectWithValue }) => {
        try {
            const response = await apiPostCategoryDetail({ _id, isLeaf } as ICategory) as {
                data: CategoriesResponse
            }
            return { ...response.data, level, isLeaf }
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
                const { isLeaf, level, metadata } = action.payload;
                const metaArray = Array.isArray(metadata) ? metadata : [metadata];

                if (isLeaf) {
                    state.data = metaArray.filter(item => item.isLeaf === isLeaf);
                } else {
                    if (level === 0) {
                        state.data = metaArray;
                    } else {
                        state.data[level] = metaArray[0];
                        state.data = state.data.slice(0, level + 1);
                    }
                }


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