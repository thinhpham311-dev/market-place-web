import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostProductsListByShop } from "@/features/product/list/by-shop-id/services";
import {
  PRO_LIST_BY_SHOPID_CACHE_KEY,
  PRO_LIST_BY_SHOPID_RETRY_DELAY,
  PRO_LIST_BY_SHOPID_RETRIES,
  PRO_LIST_BY_SHOPID_TTL,
  PRO_LIST_BY_SHOPID_TAG,
  DEFAULT_SHOP_ID,
} from "@/features/product/list/by-shop-id/constants";
import {
  IProductListRequest,
  IProductListResponse,
} from "@/features/product/list/by-shop-id/interfaces";
import { initialState } from "./initials";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export const getProductListByShop = createAsyncThunk<IProductListResponse, IProductListRequest>(
  "proListByShopId/data/getList",
  async (requestParams: IProductListRequest, { rejectWithValue, dispatch }) => {
    try {
      const page = requestParams.page || 1;
      const limit = requestParams.limit || 20;
      const paramsWithDefault = {
        ...requestParams,
        page,
        limit,
        offset: (page - 1) * limit,
        ids: requestParams.ids || requestParams.shopId || requestParams.shop_id || DEFAULT_SHOP_ID,
      };

      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: PRO_LIST_BY_SHOPID_CACHE_KEY,
          params: paramsWithDefault,
          apiFn: apiPostProductsListByShop,
          options: {
            TTL: PRO_LIST_BY_SHOPID_TTL,
            retries: PRO_LIST_BY_SHOPID_RETRIES,
            retryDelay: PRO_LIST_BY_SHOPID_RETRY_DELAY,
            tags: [PRO_LIST_BY_SHOPID_TAG],
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
  name: "proListByShopId/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductListByShop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getProductListByShop.fulfilled, (state, action) => {
        const { list = [], total = 0, page = 1, limit = 20 } = action.payload?.metadata || {};
        state.list = list;
        state.total = total;
        state.page = page;
        state.limit = limit;
        state.loading = false;
        state.status = "success";
      })
      .addCase(getProductListByShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.total = 0;
        state.list = [];
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
