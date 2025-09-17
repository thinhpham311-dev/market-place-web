import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSkuDetail } from '@/features/product/sku/services';
import { ISkuPro } from '@/interfaces/sku';

type SkuDetailResponse = {
    metadata: ISkuPro;
};

// Định nghĩa error payload
interface IErrorPayload {
    message: string;
    [key: string]: any; // nếu API trả thêm field thì vẫn nhận được
}

export const getSkuDetail = createAsyncThunk<
    SkuDetailResponse,
    ISkuPro,
    { rejectValue: IErrorPayload | string }
>(
    "detail/data/getSkuDetail",
    async (params, { rejectWithValue }) => {
        try {
            const response = (await apiPostSkuDetail(params)) as { data: SkuDetailResponse };
            return response.data;
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
