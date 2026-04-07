import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetVoucherProducts } from "@/features/voucher/detail/services";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import type {
  UseFetchVoucherProductsParams,
  VoucherProductsResponse,
  VoucherProductsState,
} from "@/features/voucher/detail/types";

const initialState: VoucherProductsState = {
  loading: false,
  error: null,
  data: null,
};

export const getVoucherProducts = createAsyncThunk<
  VoucherProductsResponse,
  UseFetchVoucherProductsParams,
  { rejectValue: string }
>("voucherDetailProducts/data/getList", async (payload, { rejectWithValue }) => {
  try {
    const response = (await apiGetVoucherProducts({
      code: payload.code || "",
      shopId: payload.shopId,
      limit: payload.limit,
      page: payload.page,
    })) as { data: VoucherProductsResponse };
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
      })
      .addCase(getVoucherProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getVoucherProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = getApiErrorMessage(action.payload, translateRuntime("api_server_error"));
        state.data = null;
      });
  },
});

export default dataSlice.reducer;
