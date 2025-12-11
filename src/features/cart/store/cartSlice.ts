import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    apiPostShowItems,
    apiPostAddItem,
    apiPostDeleteItem,
    apiPostDeleteItems,
    apiPostUpdateQtyItem,
    apiPostUpdateVariantsItem
} from '@/features/cart/services';
import { ICart, ICartItem } from '@/interfaces/cart';
import {
    SHOPPING_CART_CACHE_KEY,
    SHOPPING_CART_RETRY_DELAY,
    SHOPPING_CART_RETRIES,
    SHOPPING_CART_TTL,
    SHOPPING_CART_TAG,
} from '@/features/cart/constants';
import { initialState, ensureStoreKeyState } from '@/features/cart/store/initial';
import { recalculateTotals } from "@/features/cart/helpers"

type CartResponse = {
    metadata: ICart;
};

interface IErrorPayload {
    message: string;
    [key: string]: any;
}

export const getItemsInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string },
    { rejectValue: IErrorPayload | string }
>(
    'cart/data/getItemInCart',
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const data = (await dispatch({
                type: 'api/fetch',
                payload: {
                    key: SHOPPING_CART_CACHE_KEY,
                    params,
                    apiFn: apiPostShowItems,
                    options: {
                        TTL: SHOPPING_CART_TTL,
                        retries: SHOPPING_CART_RETRIES,
                        retryDelay: SHOPPING_CART_RETRY_DELAY,
                        tags: [SHOPPING_CART_TAG],
                    },
                },
            })) as unknown as CartResponse;

            return data;

        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const addItemIntoCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, item: ICartItem, userId: string },
    { rejectValue: IErrorPayload | string }
>('cart/data/addItemIntoCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(addItem({ ...params }));
        const response = (await apiPostAddItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const removeItemOutCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string, item: ICartItem },
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeItem({ ...params }))
        const response = (await apiPostDeleteItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


export const removeItemsOutCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string; items: ICartItem[] },
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemsOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeSelectedItems({ ...params }))
        const response = (await apiPostDeleteItems({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const updateQtyItemInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, item: ICartItem, userId: string },
    { rejectValue: IErrorPayload | string }
>('cart/data/updateQtyItemInCart', async (params, { rejectWithValue }) => {
    try {
        const response = (await apiPostUpdateQtyItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


export const updateVariantsItemInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, cartId: string, item: ICartItem, userId: string },
    { rejectValue: IErrorPayload | string }
>('cart/data/updateVariantsItemInCart', async (params, {
    rejectWithValue }) => {
    try {
        const response = (await apiPostUpdateVariantsItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


// --- Helper functions ---



// --- Slice ---
const cartSlice = createSlice({
    name: `cart/state`,
    initialState,
    reducers: {
        getItems: (state, action: PayloadAction<{ storeKey: string, userId: string }>) => {
            const { storeKey, userId } = action.payload;

            ensureStoreKeyState(state, storeKey);

            if (!userId) return;
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
        addItem: (state, action: PayloadAction<{ storeKey: string, item: ICartItem }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);

            const existingItem = state[storeKey].data?.cart_products.find(
                (item: ICartItem) => item.itemSkuId === item.itemSkuId
            );

            if (existingItem) {
                existingItem.itemQuantity += item.itemQuantity;
            } else {
                const newItem = {
                    ...item,
                    totalPrice: item.itemSkuPrice * item.itemQuantity,
                    discountedTotalPrice: item.itemSkuPrice * item.itemQuantity,
                };
                state[storeKey].data?.cart_products.unshift(newItem);
            }
            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        updateQtyItem: (state, action: PayloadAction<{ storeKey: string, item: ICartItem }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);
            const itemToUpdate = state[storeKey].data.cart_products.find(
                (p: ICartItem) => p.itemSkuId === item.itemSkuId
            );
            if (itemToUpdate) {
                itemToUpdate.itemQuantity = item.itemQuantity;
                itemToUpdate.itemTotalPrice = (item.itemSkuPrice || 0) * item.itemQuantity;
            }

            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        updateVariantsItem: (state, action: PayloadAction<{ storeKey: string, item: ICartItem }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);


            const itemToUpdate = state[storeKey].data.cart_products.find(
                (p: ICartItem) => p.itemSkuId === item.itemSkuId
            );

            if (itemToUpdate) {
                itemToUpdate.itemSkuId = item.itemSkuId;
                itemToUpdate.itemSkuTierIdx = item.itemSkuTierIdx;
                itemToUpdate.itemSkuPrice = item.itemSkuPrice;
                itemToUpdate.itemTotalPrice = (item.itemSkuPrice || 0) * item.itemQuantity;
            }

            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        selectItems: (state, action: PayloadAction<{ storeKey: string, items: ICartItem[] }>) => {
            const { storeKey, items } = action.payload;
            ensureStoreKeyState(state, storeKey);

            state[storeKey].data.cart_selected_items = items;

            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        removeItem: (state, action: PayloadAction<{ storeKey: string, item: ICartItem }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);


            state[storeKey].data.cart_products = state[storeKey].data.cart_products.filter(
                (p: ICartItem) => p.itemSkuId !== item.itemSkuId
            );
            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        removeAllItems: (state, action: PayloadAction<{ storeKey: string }>) => {
            const { storeKey } = action.payload;

            state[storeKey].data.cart_products = [];
            state[storeKey].data.cart_selected_items = [];
            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        removeSelectedItems: (state, action: PayloadAction<{ storeKey: string, items: ICartItem[] }>) => {
            const { storeKey, items } = action.payload;
            ensureStoreKeyState(state, storeKey);

            const selectedSet = new Set(items.map((item) => item.itemSkuId));
            state[storeKey].data.cart_products = state[storeKey].data.cart_products.filter(
                (item: ICartItem) => !selectedSet.has(item.itemSkuId)
            );
            state[storeKey].data.cart_selected_items = [];
            const cartState = state[storeKey].data;

            // Nếu cart đã có item → tính lại totals
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // --- get items ---
            .addCase(getItemsInCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);

                state[storeKey].loading = true;
            })
            .addCase(getItemsInCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);

                state[storeKey].data = action.payload.metadata;
                state[storeKey].loading = false;
            })
            .addCase(getItemsInCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);

                state[storeKey].loading = false;
                state[storeKey].error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
            })

            // --- add item ---
            .addCase(addItemIntoCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = true;
            })
            .addCase(addItemIntoCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].data = action.payload.metadata;
                state[storeKey].loading = false;
            })
            .addCase(addItemIntoCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = false;
                state[storeKey].error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
            })

            // --- remove item ---
            .addCase(removeItemOutCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);

                state[storeKey].loading = true;
            })
            .addCase(removeItemOutCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].data = action.payload.metadata;
                state[storeKey].loading = false;
            })
            .addCase(removeItemOutCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = false;
                state[storeKey].error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
            })

            // --- update quantity item ---
            .addCase(updateQtyItemInCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = true;
            })
            .addCase(updateQtyItemInCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].data = action.payload.metadata;
                state[storeKey].loading = false;
            })
            .addCase(updateQtyItemInCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = false;
                state[storeKey].error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');

            })

            // --- update variants item ---
            .addCase(updateVariantsItemInCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = true;
            })
            .addCase(updateVariantsItemInCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].data = action.payload.metadata;
                state[storeKey].loading = false;
            })
            .addCase(updateVariantsItemInCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                ensureStoreKeyState(state, storeKey);


                state[storeKey].loading = false;
                state[storeKey].error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
            });
    },
});



export const {
    getItems,
    addItem,
    updateQtyItem,
    updateVariantsItem,
    selectItems,
    removeItem,
    removeAllItems,
    removeSelectedItems
} = cartSlice.actions;

export default cartSlice.reducer;