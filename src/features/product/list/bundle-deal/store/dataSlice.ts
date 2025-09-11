import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsList } from '@/features/product/list/bundle-deal/services'
import { IFilter, ISpuPro } from '@/interfaces/spu';

type ProductListResponse = {
    metadata:
    {
        list: ISpuPro[],
        total: number;
    };
};

interface IProductState {
    loading: boolean;
    error: string | null;
    list: ISpuPro[];
    total: number;
}

const initialState: IProductState = {
    loading: false,
    list: [],
    total: 0,
    error: null
}

export const getProductList = createAsyncThunk<ProductListResponse, IFilter>(
    'proBundleDealList/data/getList',
    async (params: IFilter, { rejectWithValue }) => {
        try {
            const response = await apiPostProductsList(params) as
                {
                    data: {
                        metadata: {
                            list: ISpuPro[],
                            total: number
                        }
                    }
                };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });


const dataSlice = createSlice({
    name: 'proBundleDealList/data',
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