import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostSkuDetail } from "@/features/sku/services";
import {
  SKU_KEY_CACHE_KEY,
  SKU_KEY_RETRY_DELAY,
  SKU_KEY_RETRIES,
  SKU_KEY_TTL,
  SKU_KEY_TAG,
} from "@/features/sku/constants";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { ISkuRequest, ISkuResponse } from "@/features/sku/interfaces";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import { initialState } from "./initials";

export const getSkuDetail = createAsyncThunk<ISkuResponse, ISkuRequest>(
  "detail/data/getSkuDetail",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { sku_tier_idx, optionsCount } = params;

      if (!sku_tier_idx || sku_tier_idx.length !== optionsCount) {
        return rejectWithValue({ message: "Not enough options selected" });
      }

      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: SKU_KEY_CACHE_KEY,
          params,
          apiFn: apiPostSkuDetail,
          options: {
            TTL: SKU_KEY_TTL,
            retries: SKU_KEY_RETRIES,
            retryDelay: SKU_KEY_RETRY_DELAY,
            tags: [SKU_KEY_TAG],
          },
        },
      })) as unknown as ISkuResponse;

      return data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);

const dataSlice = createSlice({
  name: "detail/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkuDetail.pending, (state) => {
        state.sku = null;
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSkuDetail.fulfilled, (state, action) => {
        const product = action.payload.metadata;
        state.sku = product;
        state.loading = false;
        state.status = "success";
        state.error = null;
      })
      .addCase(getSkuDetail.rejected, (state, action) => {
        state.sku = null;
        state.loading = false;
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export default dataSlice.reducer;
