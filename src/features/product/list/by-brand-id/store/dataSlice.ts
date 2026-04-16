import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostProductsListByBrand } from "@/features/product/list/by-brand-id/services";
import {
  PRO_LIST_BY_BRANDID_CACHE_KEY,
  PRO_LIST_BY_BRANDID_RETRY_DELAY,
  PRO_LIST_BY_BRANDID_RETRIES,
  PRO_LIST_BY_BRANDID_TTL,
  PRO_LIST_BY_BRANDID_TAG,
} from "@/features/product/list/by-brand-id/constants";
import {
  IProductListRequest,
  IProductListResponse,
} from "@/features/product/list/by-brand-id/interfaces";
import { initialState } from "./initials";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export const getProductListByBrand = createAsyncThunk<IProductListResponse, IProductListRequest>(
  "proListByBrandId/data/getList",
  async (_: IProductListRequest, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: PRO_LIST_BY_BRANDID_CACHE_KEY,
          params: _,
          apiFn: apiPostProductsListByBrand,
          options: {
            TTL: PRO_LIST_BY_BRANDID_TTL,
            retries: PRO_LIST_BY_BRANDID_RETRIES,
            retryDelay: PRO_LIST_BY_BRANDID_RETRY_DELAY,
            tags: [PRO_LIST_BY_BRANDID_TAG],
          },
        },
      })) as unknown as IProductListResponse;
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);

const dataSlice = createSlice({
  name: "proListByBrandId/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductListByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getProductListByBrand.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.status = "success";
      })
      .addCase(getProductListByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
