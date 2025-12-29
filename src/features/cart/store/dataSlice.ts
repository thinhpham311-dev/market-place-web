import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiPostShowItems,
  apiPostCreateItem,
  apiPostDeleteItem,
  apiPostDeleteItemsSelected,
  apiPostDeleteItemsAll,
  apiPostUpdateQtyItem,
  apiPostUpdateVariantsItem,
} from "@/features/cart/services";
import { ICartModel, ICartItemModel } from "@/models/cart";
import {
  SHOPPING_CART_CACHE_KEY,
  SHOPPING_CART_RETRY_DELAY,
  SHOPPING_CART_RETRIES,
  SHOPPING_CART_TTL,
  SHOPPING_CART_TAG,
} from "@/features/cart/constants";
import { initialState } from "@/features/cart/store/initial";
import {
  setItemLoading,
  setActionLoading,
  setItemError,
  setActionError,
} from "@/features/cart/helpers/stateHelpers";
import { handleAxiosError, NormalizedApiError } from "@/lib/http/handleAxiosError";

type CartResponse = {
  metadata: ICartModel;
};

export const getItemsInCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; userId: string },
  { rejectValue: NormalizedApiError }
>("cart/data/getItemInCart", async (params, { rejectWithValue, dispatch }) => {
  try {
    const data = (await dispatch({
      type: "api/fetch",
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
    return rejectWithValue(handleAxiosError(error));
  }
});

export const createItemInCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; item: ICartItemModel; userId: string },
  { rejectValue: NormalizedApiError }
>("cart/data/createItemInCart", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostCreateItem({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateQtyItemInCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; item: ICartItemModel; userId: string },
  { rejectValue: NormalizedApiError }
>("cart/data/updateQtyItemInCart", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostUpdateQtyItem({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateVariantsItemInCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; item: ICartItemModel; userId: string },
  { rejectValue: NormalizedApiError }
>("cart/data/updateVariantsItemInCart", async (params, { rejectWithValue }) => {
  try {
    //
    const response = (await apiPostUpdateVariantsItem({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteItemOutCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; userId: string; item: ICartItemModel },
  { rejectValue: NormalizedApiError }
>("cart/data/deleteItemOutCart", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostDeleteItem({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteItemsSelectedOutCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; userId: string; items: ICartItemModel[] },
  { rejectValue: NormalizedApiError }
>("cart/data/deleteItemsSelectedOutCart", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostDeleteItemsSelected({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteItemsAllOutCart = createAsyncThunk<
  CartResponse,
  { storeKey: string; userId: string },
  { rejectValue: NormalizedApiError }
>("cart/data/deleteItemsAllOutCart", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostDeleteItemsAll({ ...params })) as { data: CartResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

const cartSlice = createSlice({
  name: `cart/data`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsInCart.pending, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, storeKey, "showList", true);
      })
      .addCase(getItemsInCart.fulfilled, (state, action) => {
        const { storeKey } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setActionLoading(state, storeKey, "showList", false);
      })
      .addCase(getItemsInCart.rejected, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionError(state, action.meta.arg.storeKey, "showList", action.payload);
        setActionLoading(state, storeKey, "showList", false);
      });
    builder
      .addCase(createItemInCart.pending, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, storeKey, "createItem", true);
      })
      .addCase(createItemInCart.fulfilled, (state, action) => {
        const { storeKey } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setActionLoading(state, storeKey, "createItem", false);
      })
      .addCase(createItemInCart.rejected, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionError(state, storeKey, "createItem", action.payload);
        setActionLoading(state, storeKey, "createItem", false);
      });
    builder
      .addCase(updateQtyItemInCart.pending, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "updateQty", true);
      })
      .addCase(updateQtyItemInCart.fulfilled, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setItemLoading(state, storeKey, item.itemSkuId, "updateQty", false);
      })
      .addCase(updateQtyItemInCart.rejected, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "updateQty", false);
        setItemError(state, storeKey, item.itemSkuId, "updateQty", action.payload);
      });
    builder
      .addCase(updateVariantsItemInCart.pending, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", true);
      })
      .addCase(updateVariantsItemInCart.fulfilled, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", false);
      })
      .addCase(updateVariantsItemInCart.rejected, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "updateVariant", false);
        setItemError(state, storeKey, item.itemSkuId, "updateVariant", action.payload);
      });
    builder
      .addCase(deleteItemOutCart.pending, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", true);
      })
      .addCase(deleteItemOutCart.fulfilled, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", false);
      })
      .addCase(deleteItemOutCart.rejected, (state, action) => {
        const { storeKey, item } = action.meta.arg;
        setItemLoading(state, storeKey, item.itemSkuId, "deleteItem", false);
        setItemError(state, storeKey, item.itemSkuId, "deleteItem", action.payload);
      });
    builder
      .addCase(deleteItemsSelectedOutCart.pending, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, storeKey, "deleteItemsSelected", true);
      })
      .addCase(deleteItemsSelectedOutCart.fulfilled, (state, action) => {
        const { storeKey } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setActionLoading(state, storeKey, "deleteItemsSelected", false);
      })
      .addCase(deleteItemsSelectedOutCart.rejected, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, action.meta.arg.storeKey, "deleteItemsSelected", false);
        setActionError(state, storeKey, "deleteItemsSelected", action.payload);
      });
    builder
      .addCase(deleteItemsAllOutCart.pending, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, storeKey, "deleteItemsAll", true);
      })
      .addCase(deleteItemsAllOutCart.fulfilled, (state, action) => {
        const { storeKey } = action.meta.arg;
        state[storeKey].data = action.payload.metadata;
        setActionLoading(state, action.meta.arg.storeKey, "deleteItemsAll", false);
      })
      .addCase(deleteItemsAllOutCart.rejected, (state, action) => {
        const { storeKey } = action.meta.arg;
        setActionLoading(state, action.meta.arg.storeKey, "deleteItemsAll", false);
        setActionError(state, storeKey, "deleteItemsAll", action.payload);
      });
  },
});

export default cartSlice.reducer;
