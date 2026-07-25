import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostShowItems } from "@/features/checkout/services";
import { ICartModel } from "@/models/cart";
import {
  CHECKOUT_KEY_CACHE_KEY,
  CHECKOUT_KEY_RETRY_DELAY,
  CHECKOUT_KEY_RETRIES,
  CHECKOUT_KEY_TTL,
  CHECKOUT_KEY_TAG,
} from "@/features/checkout/constants";
import { initialState } from "./initials";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage, NormalizedApiError } from "@/lib/http/handleAxiosError";
import {
  setActionLoading,
  setActionError,
} from "@/features/checkout/helpers/stateHelpers";

type CartResponse = {
  metadata: ICartModel;
};

export const getItemsInCart = createAsyncThunk<CartResponse, { storeKey: string; userId: string }>(
  "cart/data/getItemInCart",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: CHECKOUT_KEY_CACHE_KEY,
          params,
          apiFn: apiPostShowItems,
          options: {
            TTL: CHECKOUT_KEY_TTL,
            retries: CHECKOUT_KEY_RETRIES,
            retryDelay: CHECKOUT_KEY_RETRY_DELAY,
            tags: [CHECKOUT_KEY_TAG],
          },
        },
      })) as unknown as CartResponse;

      return data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);
const dataSlice = createSlice({
  name: "cart/data/getItemInCart",
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
        setActionError(
          state,
          action.meta.arg.storeKey,
          "showList",
          action.payload as NormalizedApiError,
        );
        setActionLoading(state, storeKey, "showList", false);
      });
    }
});

export default dataSlice.reducer;
