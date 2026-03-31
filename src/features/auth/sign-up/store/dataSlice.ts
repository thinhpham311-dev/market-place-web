import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IUser } from "@/interfaces/user";
import type { SignUpResponse } from "@/features/auth/types/auth";
import { apiPostSignUp } from "@/features/auth/sign-up/services";

interface IErrorPayload {
  message: string;
  [key: string]: any;
}

export const postSignUp = createAsyncThunk<
  SignUpResponse,
  IUser,
  { rejectValue: IErrorPayload | string }
>("signUp/data/postSignUp", async (params, { rejectWithValue }) => {
  try {
    const response = (await apiPostSignUp(params)) as { data: SignUpResponse };
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error?.message || "Sign up failed");
  }
});

interface ISignUpState {
  loading: boolean;
  user: unknown | null;
  hasSession: boolean;
  message: string | null;
  error: IErrorPayload | string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ISignUpState = {
  loading: false,
  user: null,
  hasSession: false,
  message: null,
  error: null,
  status: "idle",
};

const dataSlice = createSlice({
  name: "signUp/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignUp.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.hasSession = false;
        state.message = null;
        state.error = null;
        state.status = "loading";
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user ?? null;
        state.hasSession = Boolean(action.payload.hasSession || action.payload.token);
        state.message = action.payload.message ?? null;
        state.error = null;
        state.status = "success";
      })
      .addCase(postSignUp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.hasSession = false;
        state.message = null;
        state.status = "error";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (action.payload && typeof action.payload === "object") {
          state.error = action.payload.message || "Unknown error";
        } else {
          state.error = action.error.message || "Unknown error";
        }
      });
  },
});

export default dataSlice.reducer;
