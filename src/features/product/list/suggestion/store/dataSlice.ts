import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostProductsList } from '@/features/product/list/suggestion/services';
import { Product, Productfilter } from '@/features/product/types';

type ProductListResponse = {
    metadata:
    {
        list: Product[],
        total: number;
    };
};

interface IProductState {
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
    list: Product[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    status: "idle",
    list: [],
    total: 0,
    error: null
}


export const getProductList = createAsyncThunk<ProductListResponse, Productfilter>(
    'proSuggestionList/data/getList',
    async (params: Productfilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: {
                        metadata: {
                            list: Product[],
                            total: number
                        }
                    }
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
                state.status = "loading";
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                const { list, total } = action.payload.metadata;
                state.list = list;
                state.total = total;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.total = 0;
                state.list = [];
                state.status = "error";
            });
    },
});

export default dataSlice.reducer;
