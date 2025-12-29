// cacheSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QueryState<T = any> {
  data?: T;
  error?: any;
  status: "idle" | "loading" | "success" | "error";
  timestamp?: number;
  tags?: string[];
}

export type ApiCacheState = Record<string, QueryState>;

const initialState: ApiCacheState = {};

const cacheSlice = createSlice({
  name: "apiCache",
  initialState,
  reducers: {
    startQuery: (state, action: PayloadAction<string>) => {
      state[action.payload] = { status: "loading" };
    },
    successQuery: (state, action) => {
      const { key, data, tags } = action.payload;
      state[key] = {
        data,
        status: "success",
        timestamp: Date.now(),
        tags,
      };
    },
    errorQuery: (state, action: PayloadAction<{ key: string; error: any }>) => {
      state[action.payload.key] = {
        status: "error",
        error: action.payload.error,
      };
    },
    invalidateCacheByKey: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    invalidateCacheByTag: (state, action: PayloadAction<string>) => {
      Object.keys(state).forEach((key) => {
        if (state[key].tags?.includes(action.payload)) {
          delete state[key];
        }
      });
    },
    clearCache: () => {
      return {};
    },
  },
});

export const {
  startQuery,
  successQuery,
  errorQuery,
  invalidateCacheByKey,
  invalidateCacheByTag,
  clearCache,
} = cacheSlice.actions;

export default cacheSlice.reducer;
