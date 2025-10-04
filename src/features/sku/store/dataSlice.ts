import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSkuDetail } from '@/features/sku/services';
import { ISkuPro } from '@/interfaces/sku';
import { smartCacheFetch } from "@/store/api/helpers";
import { RootState } from '@/store';

type SkuDetailResponse = {
    metadata: ISkuPro;
};

interface IErrorPayload {
    message: string;
    [key: string]: any;
}

interface IGetSkuDetailParams extends ISkuPro {
    optionsCount: number;
}

export const getSkuDetail = createAsyncThunk<
    SkuDetailResponse,
    IGetSkuDetailParams,
    { rejectValue: IErrorPayload | string, state: RootState }
>(
    "detail/data/getSkuDetail",
    async (params, { rejectWithValue, getState, dispatch }) => {
        try {
            const { sku_tier_idx, optionsCount } = params;

            if (!sku_tier_idx || sku_tier_idx.length !== optionsCount) {
                return rejectWithValue({ message: "Not enough options selected" });
            }

            const cacheKey = `sku`;

            const data = await smartCacheFetch<ISkuPro, SkuDetailResponse>(
                cacheKey,
                params,
                async (p) => {
                    const res = await apiPostSkuDetail(p);
                    return res as { data: SkuDetailResponse };
                },
                getState,
                dispatch,
                { TTL: 5 * 60 * 1000, retries: 2, retryDelay: 500, tags: ["sku"] }

            );
            return data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data || { message: error.message || "Unknown error" }
            );
        }
    }
);


interface ISkuDetailState {
    loading: boolean;
    sku: ISkuPro | null;
    error: IErrorPayload | string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: ISkuDetailState = {
    loading: false,
    sku: null,
    status: "idle",
    error: null,
};

const dataSlice = createSlice({
    name: 'detail/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSkuDetail.pending, (state) => {
                state.sku = null;
                state.loading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(getSkuDetail.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.sku = product;
                state.loading = false;
                state.status = "success";
                state.error = null;
            })
            .addCase(getSkuDetail.rejected, (state, action) => {
                state.sku = null;
                state.loading = false;
                state.status = "error";
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else if (action.payload && typeof action.payload === "object") {
                    state.error = (action.payload as any).message || "Unknown error";
                } else {
                    state.error = action.error.message || "Unknown error";
                }
            });
    },
});

export default dataSlice.reducer;
