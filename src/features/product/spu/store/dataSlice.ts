import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPostSpuDetail } from '@/features/product/spu/services';
import { ISpuPro } from '@/interfaces/spu';



type SpuDetailResponse = {
    metadata: ISpuPro
};

export const getSpuDetail = createAsyncThunk<SpuDetailResponse, ISpuPro>(
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
    error: string | null;
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
            })
            .addCase(getSpuDetail.fulfilled, (state, action) => {
                const product = action.payload.metadata;
                state.spu = product;
                state.loading = false;
                state.status = "success";
            })
            .addCase(getSpuDetail.rejected, (state) => {
                state.spu = null;
                state.loading = false;
                state.status = "error";
            });
    },
});

export default dataSlice.reducer;
