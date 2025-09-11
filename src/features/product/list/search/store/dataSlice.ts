import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/search/services'
import { IFilter, ISpuPro } from '@/interfaces/spu';

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};

interface ProductState {
    list: ISpuPro[];
    loading: boolean;
    status: "idle" | "loading" | "success" | "error";
    total: number;
    error: string | null;
}

const initialState: ProductState = {
    list: [],
    loading: false,
    total: 0,
    status: "idle",
    error: null
};

export const getProductList = createAsyncThunk<ProductListResponse, IFilter>(
    'proSearchList/data/getList',
    async (params: IFilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: ProductListResponse
                };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });


const dataSlice = createSlice({
    name: 'proSearchList/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
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
    }
});

export default dataSlice.reducer