import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostShopDetail } from '@/features/shop/services'
import { IShopModel } from '@/models/shop';
import { SHOP_KEY_CACHE_KEY, SHOP_KEY_RETRY_DELAY, SHOP_KEY_RETRIES, SHOP_KEY_TTL, SHOP_KEY_TAG } from "@/features/shop/constants";


type ShopDetailResponse = {
    metadata: IShopModel
};

// Định nghĩa error payload
interface IErrorPayload {
    message: string;
    [key: string]: any; // nếu API trả thêm field thì vẫn nhận được
}

export const getShopById = createAsyncThunk<ShopDetailResponse, IShopModel, { rejectValue: IErrorPayload | string }>(
    'shopInfoById/data/getList',
    async (params, { rejectWithValue, dispatch }) => {
        try {

            const data = await dispatch({
                type: "api/fetch",
                payload: {
                    key: SHOP_KEY_CACHE_KEY,
                    params,
                    apiFn: apiPostShopDetail,
                    options: {
                        TTL: SHOP_KEY_TTL,
                        retries: SHOP_KEY_RETRIES,
                        retryDelay: SHOP_KEY_RETRY_DELAY,
                        tags: [SHOP_KEY_TAG],
                    },
                },
            }) as unknown as ShopDetailResponse;

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    });


interface IProductState {
    loading: boolean;
    error: string | null;
    shopInfo: IShopModel | null;
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