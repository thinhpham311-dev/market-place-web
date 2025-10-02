import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostShopDetail } from '@/features/shop/services'
import { IShop } from '@/interfaces/shop';

type ShopDetailResponse = {
    metadata: IShop
};

// Định nghĩa error payload
interface IErrorPayload {
    message: string;
    [key: string]: any; // nếu API trả thêm field thì vẫn nhận được
}

export const getShopById = createAsyncThunk<ShopDetailResponse, IShop, { rejectValue: IErrorPayload | string }>(
    'shopInfoById/data/getList',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostShopDetail(params) as { data: ShopDetailResponse };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });


interface IProductState {
    loading: boolean;
    error: string | null;
    shopInfo: IShop | null;
}

const initialState: IProductState = {
    loading: false,
    shopInfo: null,
    error: null
}

const dataSlice = createSlice({
    name: 'shopInfoById/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShopById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getShopById.fulfilled, (state, action) => {
                state.shopInfo = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getShopById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
                state.shopInfo = null;
            });
    }
});

export default dataSlice.reducer