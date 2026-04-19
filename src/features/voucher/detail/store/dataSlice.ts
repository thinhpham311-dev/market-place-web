import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetVoucherProducts } from "@/features/voucher/detail/services";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import { initialState } from "./initials";
import {
  IVoucherProductsRequest,
  IVoucherProductsResponse,
} from "@/features/voucher/detail/interfaces";

export const getVoucherProducts = createAsyncThunk<
  IVoucherProductsResponse,
  IVoucherProductsRequest,
  { rejectValue: string }
>("voucherDetailProducts/data/getList", async (payload, { rejectWithValue }) => {
  try {
    const response = (await apiGetVoucherProducts({
      code: payload.code || "",
      shopId: payload.shopId,
      limit: payload.limit,
      page: payload.page,
    })) as { data: IVoucherProductsResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getApiErrorMessage(error, translateRuntime("api_server_error")));
  }
});

const dataSlice = createSlice({
  name: "voucherDetailProducts/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVoucherProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        state.status = "loading";
      })
      .addCase(getVoucherProducts.fulfilled, (state, action) => {
        const { list, total } = action.payload.metadata;
        state.loading = false;
        state.data = action.payload;
        state.total = total;
        state.status = "success";
      })
      .addCase(getVoucherProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
        state.status = "error";
      });
  },
});

export default dataSlice.reducer;
