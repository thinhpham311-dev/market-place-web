import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsList } from '@/features/product/list/suggestion/services';
import { IProductListRequest, IProductListResponse } from "@/features/product/list/suggestion/interfaces"
import { initialState } from "./initials"



export const getProductList = createAsyncThunk<IProductListResponse, IProductListRequest>(
    'proSuggestionList/data/getList',
    async (params: IProductListRequest, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: IProductListResponse
                };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);


const dataSlice = createSlice({
    name: 'proSuggestionList/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
            });
    },
});

export default dataSlice.reducer;
