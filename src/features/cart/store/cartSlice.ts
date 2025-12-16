import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    apiPostShowItems,
    apiPostCreateItem,
    apiPostDeleteItem,
    apiPostDeleteItemsSelected,
    apiPostDeleteItemsAll,
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
import { initialState } from "@/features/cart/store/initial"
import {
    checkIsSameVariant,
    recalculateTotals,
    setItemLoading,
    setActionLoading,
    setItemError,
    setActionError,
    ensureStoreKeyState

} from "@/features/cart/helpers"
import { handleAxiosError, NormalizedApiError } from "@/lib/http/handleAxiosError"

type CartResponse = {
    metadata: ICart;
};


export const getItemsInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string },
    { rejectValue: NormalizedApiError }
>(
    'cart/data/getItemInCart',
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const data = (await dispatch({
                type: 'api/fetch',
                payload: {
                    key: SHOPPING_CART_CACHE_KEY,
                    // params,
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
            return rejectWithValue(handleAxiosError(error));
        }
    }
);

export const createItemInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, item: ICartItem, userId: string },
    { rejectValue: NormalizedApiError }
>('cart/data/createItemInCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(createItem({ ...params }));
        const response = (await apiPostCreateItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});

export const updateQtyItemInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, item: ICartItem, userId: string },
    { rejectValue: NormalizedApiError }
>('cart/data/updateQtyItemInCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(updateQtyItem({ ...params }))

        const response = (await apiPostUpdateQtyItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});

export const updateVariantsItemInCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, item: ICartItem, userId: string },
    { rejectValue: NormalizedApiError }
>('cart/data/updateVariantsItemInCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(updateVariantsItem({ ...params }))
        const response = (await apiPostUpdateVariantsItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});



export const deleteItemOutCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string, item: ICartItem },
    { rejectValue: NormalizedApiError }
>('cart/data/deleteItemOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeItem({ ...params }))
        const response = (await apiPostDeleteItem({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});

export const deleteItemsSelectedOutCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string; items: ICartItem[] },
    { rejectValue: NormalizedApiError }
>('cart/data/deleteItemsSelectedOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeSelectedItems({ ...params }))
        const response = (await apiPostDeleteItemsSelected({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});

export const deleteItemsAllOutCart = createAsyncThunk<
    CartResponse,
    { storeKey: string, userId: string; },
    { rejectValue: NormalizedApiError }
>('cart/data/deleteItemsAllOutCart', async (params, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(removeAllItems({ ...params }))
        const response = (await apiPostDeleteItemsAll({ ...params })) as { data: CartResponse };
        return response.data;
    } catch (error: any) {
        return rejectWithValue(handleAxiosError(error));
    }
});


const cartSlice = createSlice({
    name: `cart/state`,
    initialState,
    reducers: {
        getItems: (state, action: PayloadAction<{
            storeKey: string,
            userId: string
        }>) => {
            const { storeKey, userId } = action.payload;
            ensureStoreKeyState(state, storeKey);
            if (!userId) return;
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
        createItem: (state, action: PayloadAction<{
            storeKey: string,
            item: ICartItem
        }>) => {
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
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },

        updateQtyItem: (state, action: PayloadAction<{
            storeKey: string,
            item: ICartItem
        }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);
            const cartState = state[storeKey].data;
            const itemToUpdate = cartState.cart_products.find(
                (p: ICartItem) => p.itemSkuId === item.itemSkuId
            );
            if (itemToUpdate) {
                itemToUpdate.itemQuantity = item.itemQuantity;
                itemToUpdate.itemTotalPrice =
                    (itemToUpdate.itemSkuPrice || 0) * itemToUpdate.itemQuantity;
            }
            if (cartState.cart_products.length > 0) {
                recalculateTotals(cartState);
            }
        },
        updateVariantsItem: (
            state,
            action: PayloadAction<{
                storeKey: string;
                item: ICartItem
            }>
        ) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);
            const cartState = state[storeKey].data;
            if (!cartState?.cart_products) return;
            const products = cartState.cart_products;
            const oldItem = products.find((p) => p.itemId === item.itemId);
            if (!oldItem) return;
            const oldQuantity = Number(oldItem.itemQuantity);
            const duplicatedItem = products.find(
                (p) =>
                    checkIsSameVariant(p.itemSkuTierIdx, item.itemSkuTierIdx) &&
                    p.itemSkuId !== oldItem.itemSkuId
            );
            if (duplicatedItem) {
                duplicatedItem.itemQuantity =
                    Number(duplicatedItem.itemQuantity) + oldQuantity;
                duplicatedItem.itemTotalPrice =
                    duplicatedItem.itemQuantity *
                    Number(duplicatedItem.itemSkuPrice || 0);
                cartState.cart_products = products.filter(
                    (p) => p.itemSkuId !== oldItem.itemSkuId
                );
            } else {
                oldItem.itemSkuId = item.itemSkuId;
                oldItem.itemSkuTierIdx = item.itemSkuTierIdx;
                oldItem.itemSkuPrice = item.itemSkuPrice;
                oldItem.itemTotalPrice =
                    Number(item.itemSkuPrice || 0) * oldQuantity;
            }
            if (cartState.cart_products.length > 0) {
                recalculateTotals(cartState);
            }
        },
        selectItems: (state, action: PayloadAction<{
            storeKey: string,
            items: ICartItem[]
        }>) => {
            const { storeKey, items } = action.payload;
            ensureStoreKeyState(state, storeKey);
            state[storeKey].data.cart_selected_items = items;
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
        removeItem: (state, action: PayloadAction<{
            storeKey: string,
            item: ICartItem
        }>) => {
            const { storeKey, item } = action.payload;
            ensureStoreKeyState(state, storeKey);
            state[storeKey].data.cart_products = state[storeKey].data.cart_products.filter(
                (p: ICartItem) => p.itemSkuId !== item.itemSkuId
            );
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
        removeAllItems: (state, action: PayloadAction<{
            storeKey: string
        }>) => {
            const { storeKey } = action.payload;
            state[storeKey].data.cart_products = [];
            state[storeKey].data.cart_selected_items = [];
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
        removeSelectedItems: (state, action: PayloadAction<{
            storeKey: string,
            items: ICartItem[]
        }>) => {
            const { storeKey, items } = action.payload;
            ensureStoreKeyState(state, storeKey);
            const selectedSet = new Set(items.map((item) => item.itemSkuId));
            state[storeKey].data.cart_products = state[storeKey].data.cart_products.filter(
                (item: ICartItem) => !selectedSet.has(item.itemSkuId)
            );
            state[storeKey].data.cart_selected_items = [];
            const cartState = state[storeKey].data;
            if (cartState?.cart_products?.length > 0) {
                recalculateTotals(cartState);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemsInCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, storeKey, "showList", true);
            })
            .addCase(getItemsInCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setActionLoading(state, storeKey, "showList", false);
            })
            .addCase(getItemsInCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionError(state, action.meta.arg.storeKey, "showList", action.payload)
                setActionLoading(state, storeKey, "showList", false);
            })
        builder
            .addCase(createItemInCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, storeKey, "createItem", true);

            })
            .addCase(createItemInCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setActionLoading(state, storeKey, "createItem", false);
            })
            .addCase(createItemInCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionError(state, storeKey, "createItem", action.payload)
                setActionLoading(state, storeKey, "createItem", false);

            })
        builder
            .addCase(updateQtyItemInCart.pending, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "updateQty", true);
            })
            .addCase(updateQtyItemInCart.fulfilled, (state, action) => {
                const { storeKey, item } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setItemLoading(state, storeKey, item.itemSkuId, "updateQty", false);

            })
            .addCase(updateQtyItemInCart.rejected, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "updateQty", false);
                setItemError(state, storeKey, item.itemSkuId, "updateQty", action.payload)

            })
        builder
            .addCase(updateVariantsItemInCart.pending, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", true);
            })
            .addCase(updateVariantsItemInCart.fulfilled, (state, action) => {
                const { storeKey, item } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", false);
            })
            .addCase(updateVariantsItemInCart.rejected, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", false);
                setItemError(state, storeKey, item.itemSkuId, "updateVariant", action.payload)
            })
        builder
            .addCase(deleteItemOutCart.pending, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", true);

            })
            .addCase(deleteItemOutCart.fulfilled, (state, action) => {
                const { storeKey, item } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", false);
            })
            .addCase(deleteItemOutCart.rejected, (state, action) => {
                const { storeKey, item } = action.meta.arg
                setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", false);
                setItemError(state, storeKey, item.itemSkuId, "deleteItem", action.payload)
            })
        builder
            .addCase(deleteItemsSelectedOutCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, storeKey, "deleteItemsSelected", true);

            })
            .addCase(deleteItemsSelectedOutCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setActionLoading(state, storeKey, "deleteItemsSelected", false);
            })
            .addCase(deleteItemsSelectedOutCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, action.meta.arg.storeKey, "deleteItemsSelected", false);
                setActionError(state, storeKey, "deleteItemsSelected", action.payload)
            })
        builder
            .addCase(deleteItemsAllOutCart.pending, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, storeKey, "deleteItemsAll", true);
            })
            .addCase(deleteItemsAllOutCart.fulfilled, (state, action) => {
                const { storeKey } = action.meta.arg
                state[storeKey].data = action.payload.metadata;
                setActionLoading(state, action.meta.arg.storeKey, "deleteItemsAll", false);
            })
            .addCase(deleteItemsAllOutCart.rejected, (state, action) => {
                const { storeKey } = action.meta.arg
                setActionLoading(state, action.meta.arg.storeKey, "deleteItemsAll", false);
                setActionError(state, storeKey, "deleteItemsAll", action.payload)
            })
    },
});

export const {
    getItems,
    createItem,
    updateQtyItem,
    updateVariantsItem,
    selectItems,
    removeItem,
    removeAllItems,
    removeSelectedItems
} = cartSlice.actions;

export default cartSlice.reducer;