import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { VerifyEmailOtpPayload, VerifyEmailOtpResponse } from "@/features/auth/types/auth";
import { apiPostVerifyEmailOtp } from "@/features/auth/check-otp/services";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import {
  getApiErrorMessage,
  handleAxiosError,
  type NormalizedApiError,
} from "@/lib/http/handleAxiosError";

export const postVerifyEmailOtp = createAsyncThunk<
  VerifyEmailOtpResponse,
  VerifyEmailOtpPayload,
  { rejectValue: NormalizedApiError }
>("checkOtp/data/postVerifyEmailOtp", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostVerifyEmailOtp(params)) as { data: VerifyEmailOtpResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

interface ICheckOtpState {
  loading: boolean;
  user: unknown | null;
  hasSession: boolean;
  message: string | null;
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ICheckOtpState = {
  loading: false,
  user: null,
  hasSession: false,
  message: null,
  error: null,
  status: "idle",
};

const dataSlice = createSlice({
  name: "checkOtp/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postVerifyEmailOtp.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.hasSession = false;
        state.message = null;
        state.error = null;
        state.status = "loading";
      })
      .addCase(postVerifyEmailOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user ?? null;
        state.hasSession = Boolean(action.payload.hasSession || action.payload.token);
        state.message = action.payload.message ?? null;
        state.error = null;
        state.status = "success";
      })
      .addCase(postVerifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.hasSession = false;
        state.message = null;
        state.status = "error";
        state.error = getApiErrorMessage(
          action.payload ?? action.error,
          translateRuntime("common_something_went_wrong"),
        );
      });
  },
});

export default dataSlice.reducer;
