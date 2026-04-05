import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiPostBrandAllList } from "@/features/brand/list/all/services";
import type { IBrandModel } from "@/models/brand";
import {
  BRAND_ALL_LIST_CACHE_KEY,
  BRAND_ALL_LIST_RETRIES,
  BRAND_ALL_LIST_RETRY_DELAY,
  BRAND_ALL_LIST_TAG,
  BRAND_ALL_LIST_TTL,
} from "@/features/brand/list/all/constants";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

type BrandResponse = {
  metadata: {
    list: IBrandModel[];
    total: number;
  };
};

interface BrandState {
  loading: boolean;
  error: string | null;
  list: IBrandModel[];
  total: number;
}

const initialState: BrandState = {
  loading: false,
  error: null,
  list: [],
  total: 0,
};

export const getBrandAllList = createAsyncThunk<BrandResponse, object, { rejectValue: string }>(
  "brandAllList/data/getList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: BRAND_ALL_LIST_CACHE_KEY,
          params: {},
          apiFn: apiPostBrandAllList,
          options: {
            TTL: BRAND_ALL_LIST_TTL,
            retries: BRAND_ALL_LIST_RETRIES,
            retryDelay: BRAND_ALL_LIST_RETRY_DELAY,
            tags: [BRAND_ALL_LIST_TAG],
          },
        },
      })) as unknown as BrandResponse;

      return data;
    } catch (error: any) {
      return rejectWithValue(getApiErrorMessage(error, translateRuntime("common_something_went_wrong")));
    }
  },
);

const dataSlice = createSlice({
  name: "brandAllList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandAllList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrandAllList.fulfilled, (state, action) => {
        state.list = action.payload.metadata.list;
        state.total = action.payload.metadata.total;
        state.loading = false;
      })
      .addCase(getBrandAllList.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
      });
  },
});

export default dataSlice.reducer;
