import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISpuPro } from "@/interfaces/spu";

interface CacheEntry<T = any> {
    data: T;
    timestamp: number;
}

type ApiCacheState = Record<string, CacheEntry>;

const initialState: ApiCacheState = {};

const apiCacheSlice = createSlice({
    name: "api/cache",
    initialState,
    reducers: {
        setCache: (state, action: PayloadAction<{ key: string; data: ISpuPro }>) => {
            state[action.payload.key] = {
                data: action.payload.data,
                timestamp: Date.now(),
            };
        },
        clearCache: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
    },
});

export const { setCache, clearCache } = apiCacheSlice.actions;
export default apiCacheSlice.reducer;
