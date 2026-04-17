import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostProductsList } from "@/features/product/list/daily-discover/services";
import {
  DAILY_DISCOVER_LIST_CACHE_KEY,
  DAILY_DISCOVER_LIST_RETRY_DELAY,
  DAILY_DISCOVER_LIST_RETRIES,
  DAILY_DISCOVER_LIST_TTL,
  DAILY_DISCOVER_LIST_TAG,
} from "@/features/product/list/daily-discover/constants";
import {
  IProductListRequest,
  IProductListResponse,
} from "@/features/product/list/daily-discover/interfaces";
import { initialState } from "./initials";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export const getProductListDailyDiscover = createAsyncThunk<
  IProductListResponse,
  IProductListRequest
>(
  "proListDailyDiscover/data/getList",
  async (_: IProductListRequest, { rejectWithValue, dispatch }) => {
    try {
      const data = (await dispatch({
        type: "api/fetch",
        payload: {
          key: DAILY_DISCOVER_LIST_CACHE_KEY,
          params: _,
          apiFn: apiPostProductsList,
          options: {
            TTL: DAILY_DISCOVER_LIST_TTL,
            retries: DAILY_DISCOVER_LIST_RETRIES,
            retryDelay: DAILY_DISCOVER_LIST_RETRY_DELAY,
            tags: [DAILY_DISCOVER_LIST_TAG],
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
  name: "proListDailyDiscover/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductListDailyDiscover.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getProductListDailyDiscover.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(getProductListDailyDiscover.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.total = 0;
        state.list = [];
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
