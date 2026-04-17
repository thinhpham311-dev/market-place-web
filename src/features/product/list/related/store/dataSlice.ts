import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostProductsList } from "@/features/product/list/related/services";
import {
  IProductListRequest,
  IProductListResponse,
} from "@/features/product/list/related/interfaces";
import { initialState } from "./initials";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export const getProductList = createAsyncThunk<IProductListResponse, IProductListRequest>(
  "proRelatedList/data/getList",
  async (params: IProductListRequest, { rejectWithValue }) => {
    try {
      const response = (await apiPostProductsList(params)) as {
        data: IProductListResponse;
      };
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getApiErrorMessage(error, translateRuntime("common_something_went_wrong")),
      );
    }
  },
);

const dataSlice = createSlice({
  name: "proRelatedList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.list = list;
        state.total = total;
        state.loading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.total = 0;
        state.list = [];
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
