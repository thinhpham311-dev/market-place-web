import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPostAllCategoriesList } from "@/features/category/list/all/services";
import {
  CAT_ALL_LIST_CACHE_KEY,
  CAT_ALL_LIST_RETRIES,
  CAT_ALL_LIST_RETRY_DELAY,
  CAT_ALL_LIST_TAG,
  CAT_ALL_LIST_TTL,
} from "@/features/category/list/all/constants";
import { ICategoryModel } from "@/models/category";
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

export const getAllCategoryList = createAsyncThunk<
  CategoriesResponse,
  object,
  { rejectValue: string }
>("catAllList/data/getList", async (_, { rejectWithValue, dispatch }) => {
  try {
    const data = (await dispatch({
      type: "api/fetch",
      payload: {
        key: CAT_ALL_LIST_CACHE_KEY,
        params: {},
        apiFn: apiPostAllCategoriesList,
        options: {
          TTL: CAT_ALL_LIST_TTL,
          retries: CAT_ALL_LIST_RETRIES,
          retryDelay: CAT_ALL_LIST_RETRY_DELAY,
          tags: [CAT_ALL_LIST_TAG],
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
  name: "catAllList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategoryList.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
      });
  },
});

export default dataSlice.reducer;
