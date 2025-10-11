import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostShowItems, apiPostAddItem, apiPostDeleteItem, apiPostUpdateItem } from '@/features/cart/services';
import { ICart, ICartItem } from '@/interfaces/cart';
import { ITEM_IN_CART_CACHE_KEY, ITEM_IN_CART_RETRY_DELAY, ITEM_IN_CART_RETRIES, ITEM_IN_CART_TTL, ITEM_IN_CART_TAG } from "@/features/cart/constants";

type CartResponse = {
    metadata: ICart
};

interface IErrorPayload {
    message: string;
    [key: string]: any;
}

export const getItemsInCart = createAsyncThunk<CartResponse, ICartItem, { rejectValue: IErrorPayload | string }>(
    'cart/data/getItemInCart',
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const data = await dispatch({
                type: "api/fetch",
                payload: {
                    key: ITEM_IN_CART_CACHE_KEY,
                    params,
                    apiFn: apiPostShowItems,
                    options: {
                        TTL: ITEM_IN_CART_TTL,
                        retries: ITEM_IN_CART_RETRIES,
                        retryDelay: ITEM_IN_CART_RETRY_DELAY,
                        tags: [ITEM_IN_CART_TAG],
                    },
                },
            }) as unknown as CartResponse;
            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const addItemIntoCart = createAsyncThunk<CartResponse, ICartItem, { rejectValue: IErrorPayload | string }>(
    'cart/data/addItemIntoCart',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostAddItem(params) as { data: CartResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const removeItemOutCart = createAsyncThunk<CartResponse, ICartItem, { rejectValue: IErrorPayload | string }>(
    'cart/data/removeItemOutCart',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostDeleteItem(params) as { data: CartResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const updateItemInCart = createAsyncThunk<CartResponse, ICartItem, { rejectValue: IErrorPayload | string }>(
    'cart/data/updateItemInCart',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostUpdateItem(params) as { data: CartResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

interface ISkuDetailState {
    loading: boolean;
    cart: ICart | null;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: ISkuDetailState = {
    loading: false,
    cart: null,
    status: "idle",
    error: null
};

const dataSlice = createSlice({
    name: 'cart/data',
    initialState,
    reducers: {
        clearServerCart: (state) => {
            state.cart = initialState.cart;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemsInCart.pending, (state) => {
                state.cart = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(getItemsInCart.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.cart = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getItemsInCart.rejected, (state) => {
                state.cart = null;
                state.loading = false;
                state.status = "error";
            });

        builder
            .addCase(addItemIntoCart.pending, (state) => {
                state.cart = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(addItemIntoCart.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.cart = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(addItemIntoCart.rejected, (state) => {
                state.cart = null;
                state.loading = false;
                state.status = "error";
            });

        builder
            .addCase(removeItemOutCart.pending, (state) => {
                state.cart = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(removeItemOutCart.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.cart = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(removeItemOutCart.rejected, (state) => {
                state.cart = null;
                state.loading = false;
                state.status = "error";
            });
        builder
            .addCase(updateItemInCart.pending, (state) => {
                state.cart = null;
                state.loading = true;
                state.status = "loading";
            })
            .addCase(updateItemInCart.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.cart = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(updateItemInCart.rejected, (state) => {
                state.cart = null;
                state.loading = false;
                state.status = "error";
            });
    },
});


export const { clearServerCart } = dataSlice.actions;
export default dataSlice.reducer;
