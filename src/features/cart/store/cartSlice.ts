import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    apiPostShowItems,
    apiPostAddItem,
    apiPostDeleteItem,
    apiPostDeleteItems,
    apiPostUpdateItem,
} from '@/features/cart/services';
import { ICart, ICartItem } from '@/interfaces/cart';
import {
    SHOPPING_CART_CACHE_KEY,
    SHOPPING_CART_RETRY_DELAY,
    SHOPPING_CART_RETRIES,
    SHOPPING_CART_TTL,
    SHOPPING_CART_TAG,
} from '@/features/cart/constants';

type CartResponse = {
    metadata: ICart;
};

interface IErrorPayload {
    message: string;
    [key: string]: any;
}

export const getItemsInCart = createAsyncThunk<
    CartResponse,
    ICart,
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
    { item: ICartItem },
    { rejectValue: IErrorPayload | string }
>('cart/data/addItemIntoCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(addItem({ ...params } as { item: ICartItem }))
        const response = (await apiPostAddItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const removeItemOutCart = createAsyncThunk<
    CartResponse,
    ICartItem,
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeItem({ ...params } as ICartItem))
        const response = (await apiPostDeleteItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});


export const removeItemsOutCart = createAsyncThunk<
    CartResponse,
    { items: ICartItem[] },
    { rejectValue: IErrorPayload | string }
>('cart/data/removeItemsOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeSelectedItems({ ...params } as { items: ICartItem[] }))
        const response = (await apiPostDeleteItems(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

export const updateItemInCart = createAsyncThunk<
    CartResponse,
    ICartItem,
    { rejectValue: IErrorPayload | string }
>('cart/data/updateItemInCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(updateItem({ ...params } as ICartItem))
        const response = (await apiPostUpdateItem(params)) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data || error.message);
    }
});

// --- Helper functions ---
const calculateEstimatedShipping = (totalAmount: number): number => {
    if (totalAmount === 0) return 0;
    return totalAmount > 100 ? 0 : 10;
};

const calculateEstimatedTax = (totalAmount: number): number => {
    return totalAmount * 0.1;
};

const calculateTotal = (
    totalAmount: number,
    estimatedShipping: number,
    estimatedTax: number
): number => {
    return totalAmount + estimatedShipping + estimatedTax;
};

const recalculateTotals = (cart: ICart) => {
    cart.cart_total_quantity = cart.cart_products.reduce((sum, item) => sum + item.itemQuantity, 0);
    cart.cart_sub_total = cart.cart_products.reduce(
        (sum, item) => sum + item.itemSkuPrice * item.itemQuantity,
        0
    );
    cart.cart_sub_total = cart.cart_products.reduce(
        (sum, item) => sum + (item.itemSkuPrice || 0) * item.itemQuantity,
        0
    );
    cart.cart_product_count = cart.cart_products.length;

    cart.cart_selected_items_count = cart.cart_selected_items?.length;
    // Tổng số lượng sản phẩm đã chọn

    // Tổng giá trị sản phẩm đã chọn
    cart.cart_selected_items_total = cart.cart_selected_items?.reduce(
        (sum, item) => sum + (item.itemSkuPrice || 0) * item.itemQuantity,
        0
    );

    if (cart.cart_products.length === 0) {
        cart.cart_total_price = 0;
        cart.cart_estimated_shipping = 0;
        cart.cart_estimated_tax = 0;
    } else {
        const taxableAmount =
            cart.cart_total_discount > 0 ? cart.cart_total_discount : cart.cart_sub_total;

        cart.cart_estimated_shipping = calculateEstimatedShipping(cart.cart_sub_total);
        cart.cart_estimated_tax = calculateEstimatedTax(taxableAmount);
        cart.cart_total_price = calculateTotal(
            cart.cart_total_discount,
            cart.cart_estimated_shipping,
            cart.cart_estimated_tax
        );
    }
};

// --- Initial State ---
export interface ICartState {
    loading: boolean;
    data: ICart;
    error: Error | null;
    status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: ICartState = {
    loading: false,
    data: {
        cart_products: [],
        cart_total_quantity: 0,
        cart_userId: "",
        cart_product_count: 0,
        cart_sub_total: 0,
        cart_total_discount: 0,
        cart_total_price: 0,
        cart_estimated_tax: 0,
        cart_selected_items: [],
        cart_selected_items_total: 0,
        cart_selected_items_count: 0,
        cart_estimated_shipping: 0,
    },
    status: 'idle',
    error: null,
};


// --- Slice ---
const dataSlice = createSlice({
    name: 'cart/data',
    initialState,
    reducers: {
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

        updateItem: (state, action: PayloadAction<{ itemSkuId: string; itemQuantity: number }>) => {
            const { itemSkuId, itemQuantity } = action.payload;
            const itemToUpdate = state.data.cart_products.find(
                (item: ICartItem) => item.itemSkuId === itemSkuId
            );

            if (itemToUpdate) {
                if (itemQuantity === 0) {
                    state.data.cart_products = state.data.cart_products.filter(
                        (item: ICartItem) => item.itemSkuId !== itemSkuId
                    );
                } else {
                    itemToUpdate.itemQuantity = itemQuantity;
                }
            }

            recalculateTotals(state.data);
        },

        selectItems: (state, action: PayloadAction<{ items: ICartItem[] }>) => {
            const selectedItems = action.payload.items;
            state.data.cart_selected_items = selectedItems;

            // Nếu bạn muốn cập nhật thêm tổng tổng thể (optional)
            recalculateTotals(state.data);
        },

        removeItem: (state, action: PayloadAction<{ itemSkuId: string }>) => {
            state.data.cart_products = state.data.cart_products.filter(
                (item: ICartItem) => item.itemSkuId !== action.payload.itemSkuId
            );
            recalculateTotals(state.data);
        },

        removeAllItems: (state) => {
            state.data.cart_products = [];
            state.data.cart_selected_items = [];
            recalculateTotals(state.data);
        },

        removeSelectedItems: (state, action: PayloadAction<{ items: ICartItem[] }>) => {
            const selectedSet = new Set(action.payload.items.map((item) => item.itemSkuId));
            state.data.cart_products = state.data.cart_products.filter(
                (item: ICartItem) => !selectedSet.has(item.itemSkuId)
            );
            state.data.cart_selected_items = [];
            recalculateTotals(state.data);
        },

        clearServerCart: (state) => {
            state.data = initialState.data;
        },

    },

    extraReducers: (builder) => {
        builder
            // --- get items ---
            .addCase(getItemsInCart.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getItemsInCart.fulfilled, (state, action) => {
                state.data = action.payload.metadata;
                state.loading = false;
                state.status = 'success';
            })
            .addCase(getItemsInCart.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            })

            // --- add item ---
            .addCase(addItemIntoCart.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(addItemIntoCart.fulfilled, (state, action) => {
                state.data = action.payload.metadata;
                state.loading = false;
                state.status = 'success';
            })
            .addCase(addItemIntoCart.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            })

            // --- remove item ---
            .addCase(removeItemOutCart.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(removeItemOutCart.fulfilled, (state, action) => {
                state.data = action.payload.metadata;
                state.loading = false;
                state.status = 'success';
            })
            .addCase(removeItemOutCart.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            })

            // --- update item ---
            .addCase(updateItemInCart.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(updateItemInCart.fulfilled, (state, action) => {
                state.data = action.payload.metadata;
                state.loading = false;
                state.status = 'success';
            })
            .addCase(updateItemInCart.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            });
    },
});

export const {
    clearServerCart,
    addItem,
    updateItem,
    selectItems,
    removeAllItems,
    removeItem,
    removeSelectedItems,
} = dataSlice.actions;

export default dataSlice.reducer;
