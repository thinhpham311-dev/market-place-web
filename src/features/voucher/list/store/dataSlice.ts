import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiGetDiscountList } from "@/features/voucher/list/services";

type DiscountListResponse = Record<string, any>;

interface VoucherState {
  loading: boolean;
  error: string | null;
  data: DiscountListResponse | null;
}

const initialState: VoucherState = {
  loading: false,
  error: null,
  data: null,
};

export const getDiscountList = createAsyncThunk<
  DiscountListResponse,
  { shopId: string; limit?: number; page?: number },
  { rejectValue: string }
>("voucherList/data/getList", async (payload, { rejectWithValue }) => {
  try {
    const response = (await apiGetDiscountList(payload)) as { data: DiscountListResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch vouchers");
  }
});

const dataSlice = createSlice({
  name: "voucherList/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscountList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDiscountList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch vouchers";
        state.data = null;
      });
  },
});

export default dataSlice.reducer;
