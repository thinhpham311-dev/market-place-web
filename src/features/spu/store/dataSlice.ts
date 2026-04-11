import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPostSpuDetail } from "@/features/spu/services";
import { ISpuModel } from "@/models/spu";
import {
  SPU_KEY_CACHE_KEY,
  SPU_KEY_RETRY_DELAY,
  SPU_KEY_RETRIES,
  SPU_KEY_TTL,
  SPU_KEY_TAG,
} from "@/features/spu/constants";
import { translateRuntime } from "@/lib/i18n/runtime-translation";
import {
  getApiErrorMessage,
  handleAxiosError,
  type NormalizedApiError,
} from "@/lib/http/handleAxiosError";

type SpuDetailResponse = {
  metadata: ISpuModel;
};

export const getSpuDetail = createAsyncThunk<
  SpuDetailResponse,
  ISpuModel,
  { rejectValue: NormalizedApiError }
>("detail/data/getSpuDetail", async (params, { rejectWithValue, dispatch }) => {
  try {
    const data = (await dispatch({
      type: "api/fetch",
      payload: {
        key: SPU_KEY_CACHE_KEY,
        params,
        apiFn: apiPostSpuDetail,
        options: {
          TTL: SPU_KEY_TTL,
          retries: SPU_KEY_RETRIES,
          retryDelay: SPU_KEY_RETRY_DELAY,
          tags: [SPU_KEY_TAG],
        },
      },
    })) as unknown as SpuDetailResponse;

    return data;
  } catch (error: any) {
    return rejectWithValue(handleAxiosError(error));
  }
});

interface ISpuDetailState {
  loading: boolean;
  spu: ISpuModel | null;
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ISpuDetailState = {
  loading: false,
  spu: null,
  status: "idle",
  error: null,
};

const dataSlice = createSlice({
  name: "detail/data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpuDetail.pending, (state) => {
        state.spu = null;
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSpuDetail.fulfilled, (state, action) => {
        const product = action.payload.metadata;
        state.spu = product;
        state.loading = false;
        state.status = "success";
        state.error = null;
      })
      .addCase(getSpuDetail.rejected, (state, action) => {
        state.spu = null;
        state.loading = false;
        state.status = "error";
        state.error = getApiErrorMessage(
          action.payload ?? action.error,
          translateRuntime("common_something_went_wrong"),
        );
      });
  },
});

export default dataSlice.reducer;
