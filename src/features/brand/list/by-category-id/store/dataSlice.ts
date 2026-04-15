import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiBrandsListByCategories } from "@/features/brand/list/by-category-id/services";
import {
  BRAND_ALL_LIST_BY_CATEGORIES_ID_CACHE_KEY,
  BRAND_ALL_LIST_BY_CATEGORIES_ID_RETRIES,
  BRAND_ALL_LIST_BY_CATEGORIES_ID_RETRY_DELAY,
  BRAND_ALL_LIST_BY_CATEGORIES_ID_TAG,
  BRAND_ALL_LIST_BY_CATEGORIES_ID_TTL,
} from "@/features/brand/list/by-category-id/constants";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import {
  IBrandListByCategoriesIdRequest,
  IBrandListByCategoriesIdResponse,
} from "@/features/brand/list/by-category-id/interfaces";
import { initialState } from "./initials";

export const getBrandAllListByCategoriesId = createAsyncThunk<
  IBrandListByCategoriesIdResponse,
  IBrandListByCategoriesIdRequest
>(
  "brandAllListByCategoriesId/data/getListByCategoriesId",
  async (_: IBrandListByCategoriesIdRequest, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: BRAND_ALL_LIST_BY_CATEGORIES_ID_CACHE_KEY,
          params: _,
          apiFn: apiBrandsListByCategories,
          options: {
            TTL: BRAND_ALL_LIST_BY_CATEGORIES_ID_TTL,
            retries: BRAND_ALL_LIST_BY_CATEGORIES_ID_RETRIES,
            retryDelay: BRAND_ALL_LIST_BY_CATEGORIES_ID_RETRY_DELAY,
            tags: [BRAND_ALL_LIST_BY_CATEGORIES_ID_TAG],
          },
        },
      })) as unknown as IBrandListByCategoriesIdResponse;

      return data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);

const dataSlice = createSlice({
  name: "brandAllListByCategoriesId/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandAllListByCategoriesId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getBrandAllListByCategoriesId.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.status = "success";
      })
      .addCase(getBrandAllListByCategoriesId.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
