import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsList } from '@/services/ProductService';
import { IProduct, IProductfilter } from '@/interfaces/product';

type ProductListResponse = {
    metadata:
    {
        list: IProduct[],
        total: number;
    };

};

export const getProductList = createAsyncThunk<ProductListResponse, IProductfilter>(
    'proSuggestionList/data/getList',
    async (data: IProductfilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(data) as { data: { metadata: { list: IProduct[], total: number } } };
            return response.data;

        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

// ✅ Slice state type
interface ProductState {
    list: IProduct[];
    loading: boolean;
    total: number;
}

// ✅ Initial state
const initialState: ProductState = {
    list: [],
    loading: false,
    total: 0
};

const dataSlice = createSlice({
    name: 'proSuggestionList/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductList.fulfilled, (state: { list: IProduct[]; loading: boolean, total: number }, action: { payload: any }) => {
                state.loading = false;
                const { list, total } = action.payload.metadata;

                const newItems = list.filter(
                    (item: IProduct) => !state.list.some((existing) => existing._id === item._id)
                );

                if (newItems.length > 0) {
                    state.list = [...state.list, ...newItems];
                }

                state.total = total;
            })

            .addCase(getProductList.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default dataSlice.reducer;
