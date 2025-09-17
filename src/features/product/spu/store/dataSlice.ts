import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSpuDetail } from '@/features/product/spu/services';
import { ISpuPro } from '@/interfaces/spu';



type SpuDetailResponse = {
    metadata: ISpuPro
};

// Định nghĩa error payload
interface IErrorPayload {
    message: string;
    [key: string]: any; // nếu API trả thêm field thì vẫn nhận được
}

export const getSpuDetail = createAsyncThunk<SpuDetailResponse, ISpuPro, { rejectValue: IErrorPayload | string }>(
    'detail/data/getSpuDetail',
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiPostSpuDetail(params) as { data: SpuDetailResponse }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

interface ISpuDetailState {
    loading: boolean;
    spu: ISpuPro | null;
    error: IErrorPayload | string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: ISpuDetailState = {
    loading: false,
    spu: null,
    status: "idle",
    error: null
};


const dataSlice = createSlice({
    name: 'detail/data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSpuDetail.pending, (state) => {
                state.spu = null;
                state.loading = true;
                state.status = "loading";
                state.error = null
            })
            .addCase(getSpuDetail.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.spu = product;
                state.loading = false;
                state.status = "success";
                state.error = null

            })
            .addCase(getSpuDetail.rejected, (state, action) => {
                state.spu = null;
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
