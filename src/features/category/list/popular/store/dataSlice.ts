import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostCategoriesList } from "@/features/category/list/popular/services";
import { ICategoryModel } from "@/models/category";
import {
  CAT_POPULAR_LIST_CACHE_KEY,
  CAT_POPULAR_LIST_RETRY_DELAY,
  CAT_POPULAR_LIST_RETRIES,
  CAT_POPULAR_LIST_TTL,
  CAT_POPULAR_LIST_TAG,
} from "@/features/category/list/popular/constants";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

type CategoriesResponse = {
  metadata: {
    list: ICategoryModel[];
    total: number;
  };
};

interface ICategoryState {
  loading: boolean;
  error: string | null;
  list: ICategoryModel[];
  total?: number;
}

const initialState: ICategoryState = {
  loading: false,
  error: null,
  list: [],
  total: 0,
};

export const getCategoryList = createAsyncThunk<
  CategoriesResponse,
  object,
  { rejectValue: string }
>("catPopularList/data/getList", async (_, { rejectWithValue, dispatch }) => {
  try {
    const data = (await dispatch({
      type: "api/fetch",
      payload: {
        key: CAT_POPULAR_LIST_CACHE_KEY,
        params: {},
        apiFn: apiPostCategoriesList,
        options: {
          TTL: CAT_POPULAR_LIST_TTL,
          retries: CAT_POPULAR_LIST_RETRIES,
          retryDelay: CAT_POPULAR_LIST_RETRY_DELAY,
          tags: [CAT_POPULAR_LIST_TAG],
        },
      },
    })) as unknown as CategoriesResponse;

    return data;
  } catch (err: any) {
    return rejectWithValue(
      getApiErrorMessage(err, translateRuntime("common_something_went_wrong")),
    );
  }
});

const dataSlice = createSlice({
  name: "catPopularList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
      });
  },
});

export default dataSlice.reducer;
