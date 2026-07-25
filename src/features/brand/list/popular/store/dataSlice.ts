import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiPostBrandPopularList } from "@/features/brand/list/popular/services";
import type { IBrandModel } from "@/models/brand";
import {
  BRAND_POPULAR_LIST_CACHE_KEY,
  BRAND_POPULAR_LIST_RETRIES,
  BRAND_POPULAR_LIST_RETRY_DELAY,
  BRAND_POPULAR_LIST_TAG,
  BRAND_POPULAR_LIST_TTL,
} from "@/features/brand/list/popular/constants";
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

export const getBrandPopularList = createAsyncThunk<BrandResponse, object, { rejectValue: string }>(
  "brandAllList/data/getList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: BRAND_POPULAR_LIST_CACHE_KEY,
          params: {},
          apiFn: apiPostBrandPopularList,
          options: {
            TTL: BRAND_POPULAR_LIST_TTL,
            retries: BRAND_POPULAR_LIST_RETRIES,
            retryDelay: BRAND_POPULAR_LIST_RETRY_DELAY,
            tags: [BRAND_POPULAR_LIST_TAG],
          },
        },
      })) as unknown as BrandResponse;

      return data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);

const dataSlice = createSlice({
  name: "brandPopularList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandPopularList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrandPopularList.fulfilled, (state, action) => {
        state.list = action.payload.metadata.list;
        state.total = action.payload.metadata.total;
        state.loading = false;
      })
      .addCase(getBrandPopularList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.total = 0;
        state.list = [];
      });
  },
});

export default dataSlice.reducer;
