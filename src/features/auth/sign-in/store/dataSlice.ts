import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IUser } from "@/interfaces/user";
import type { SignInResponse } from "@/features/auth/types/auth";
import { apiPostSignIn } from "@/features/auth/sign-in/services";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import {
  getApiErrorMessage,
  handleAxiosError,
  type NormalizedApiError,
} from "@/lib/http/handleAxiosError";

export const postSignIn = createAsyncThunk<
  SignInResponse,
  IUser,
  { rejectValue: NormalizedApiError }
>("signIn/data/postSignIn", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostSignIn(params)) as { data: SignInResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

interface ISignInState {
  loading: boolean;
  user: unknown | null;
  hasSession: boolean;
  message: string | null;
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ISignInState = {
  loading: false,
  user: null,
  hasSession: false,
  message: null,
  error: null,
  status: "idle",
};

const dataSlice = createSlice({
  name: "signIn/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignIn.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.hasSession = false;
        state.message = null;
        state.error = null;
        state.status = "loading";
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user ?? null;
        state.hasSession = Boolean(action.payload.hasSession || action.payload.token);
        state.message = action.payload.message ?? null;
        state.error = null;
        state.status = "success";
      })
      .addCase(postSignIn.rejected, (state, action) => {
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
