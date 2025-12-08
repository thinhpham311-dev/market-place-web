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
    SHOPPING_CART,
    SHOPPING_CART_CACHE_KEY,
    SHOPPING_CART_RETRY_DELAY,
    SHOPPING_CART_RETRIES,
    SHOPPING_CART_TTL,
    SHOPPING_CART_TAG,
} from '@/features/cart/constants';
import { initialState } from './cart.initial';
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
    { userId: string },
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
    { item: ICartItem, userId: string },
    { rejectValue: IErrorPayload | string }
>('cart/data/addItemIntoCart', async (params, { rejectWithValue }) => {
    try {
        const response = (await apiPostAddItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const removeItemOutCart = createAsyncThunk<
    CartResponse,
    { userId: string, item: ICartItem },
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemOutCart', async (params, { rejectWithValue }) => {
    try {
        const response = (await apiPostDeleteItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


export const removeItemsOutCart = createAsyncThunk<
    CartResponse,
    { userId: string; items: ICartItem[] },
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemsOutCart', async (params, { rejectWithValue }) => {
    try {
        const response = (await apiPostDeleteItems(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const updateQtyItemInCart = createAsyncThunk<
    CartResponse,
    { item: ICartItem, userId: string },
    { rejectValue: IErrorPayload | string }
>('cart/data/updateQtyItemInCart', async (params, { rejectWithValue }) => {
    try {
        const response = (await apiPostUpdateQtyItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


export const updateVariantsItemInCart = createAsyncThunk<
    CartResponse,
    { cartId: string, item: ICartItem, userId: string },
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
export const shoppingCartSlice = (storeKey: string) => {
    return createSlice({
        name: `${SHOPPING_CART}_${storeKey}`,
        initialState,
        reducers: {
            getItems: (state, action: PayloadAction<{ items: ICartItem[] }>) => {
                const { items } = action.payload
                state.data.cart_products = items;
                recalculateTotals(state.data);
            },
            addItem: (state, action: PayloadAction<{ item: ICartItem }>) => {
                const { item } = action.payload;
                const existingItem = state.data?.cart_products.find(
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
                    state.data?.cart_products.unshift(newItem);
                }
                recalculateTotals(state.data);
            },

            updateQtyItem: (state, action: PayloadAction<{ item: ICartItem }>) => {
                const { item } = action.payload;
                const itemToUpdate = state.data.cart_products.find(
                    (item: ICartItem) => item.itemSkuId === item.itemSkuId
                );

                if (itemToUpdate) {
                    itemToUpdate.itemQuantity = item.itemQuantity;
                    itemToUpdate.itemTotalPrice = (item.itemSkuPrice || 0) * item.itemQuantity;
                }

                recalculateTotals(state.data);
            },

            updateVariantsItem: (state, action: PayloadAction<{ item: ICartItem }>) => {
                const { item } = action.payload;

                const itemToUpdate = state.data.cart_products.find(
                    (p: ICartItem) => p.itemSkuId === item.itemSkuId
                );

                if (itemToUpdate) {
                    itemToUpdate.itemSkuId = item.itemSkuId;
                    itemToUpdate.itemSkuTierIdx = item.itemSkuTierIdx;
                    itemToUpdate.itemSkuPrice = item.itemSkuPrice;
                    itemToUpdate.itemTotalPrice = (item.itemSkuPrice || 0) * item.itemQuantity;
                }

                recalculateTotals(state.data);
            },

            selectItems: (state, action: PayloadAction<{ items: ICartItem[] }>) => {
                const { items } = action.payload;
                state.data.cart_selected_items = items;

                recalculateTotals(state.data);
            },

            removeItem: (state, action: PayloadAction<{ item: ICartItem }>) => {
                const { item } = action.payload;

                state.data.cart_products = state.data.cart_products.filter(
                    (p: ICartItem) => p.itemSkuId !== item.itemSkuId
                );
                recalculateTotals(state.data);
            },

            removeAllItems: (state) => {
                state.data.cart_products = [];
                state.data.cart_selected_items = [];
                recalculateTotals(state.data);
            },

            removeSelectedItems: (state, action: PayloadAction<{ items: ICartItem[] }>) => {
                const { items } = action.payload;
                const selectedSet = new Set(items.map((item) => item.itemSkuId));
                state.data.cart_products = state.data.cart_products.filter(
                    (item: ICartItem) => !selectedSet.has(item.itemSkuId)
                );
                state.data.cart_selected_items = [];
                recalculateTotals(state.data);
            },
        },
        extraReducers: (builder) => {
            builder
                // --- get items ---
                .addCase(getItemsInCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getItemsInCart.fulfilled, (state, action) => {
                    state.data = action.payload.metadata;
                    state.loading = false;
                })
                .addCase(getItemsInCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
                })

                // --- add item ---
                .addCase(addItemIntoCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addItemIntoCart.fulfilled, (state, action) => {
                    state.data = action.payload.metadata;
                    state.loading = false;
                })
                .addCase(addItemIntoCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
                })

                // --- remove item ---
                .addCase(removeItemOutCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(removeItemOutCart.fulfilled, (state, action) => {
                    state.data = action.payload.metadata;
                    state.loading = false;
                })
                .addCase(removeItemOutCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
                })

                // --- update quantity item ---
                .addCase(updateQtyItemInCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updateQtyItemInCart.fulfilled, (state, action) => {
                    state.data = action.payload.metadata;
                    state.loading = false;
                })
                .addCase(updateQtyItemInCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');

                })

                // --- update variants item ---
                .addCase(updateVariantsItemInCart.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updateVariantsItemInCart.fulfilled, (state, action) => {
                    state.data = action.payload.metadata;
                    state.loading = false;
                })
                .addCase(updateVariantsItemInCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload instanceof Error ? action.payload : new Error(typeof action.payload === 'string' ? action.payload : 'Failed to fetch product list');
                });
        },
    });
}


