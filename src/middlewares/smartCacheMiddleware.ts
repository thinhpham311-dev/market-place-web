import type { Middleware } from "@reduxjs/toolkit";
import { startQuery, successQuery, errorQuery } from "@/store/api/cacheSlice";
import type { RootState, AppDispatch } from "@/store";

const inflight: Record<string, Promise<any> | undefined> = {};

function stableStringify(obj: any): string {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

function makeCacheKey(prefix: string, params?: object) {
  if (!params || Object.keys(params).length === 0) return prefix;
  return `${prefix}-${stableStringify(params)}`;
}

interface ApiFetchAction {
  type: "api/fetch";
  payload: {
    key: string;
    params?: any;
    apiFn: (params: any) => Promise<{ data: any }>;
    options?: {
      TTL?: number;
      retries?: number;
      retryDelay?: number;
      tags?: string[];
      force?: boolean;
    };
  };
}

export const smartCacheMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => async (action: any) => {
    if (action.type !== "api/fetch") {
      return next(action);
    }

    const { key, params = {}, apiFn, options = {} } = action.payload as ApiFetchAction["payload"];
    const cacheKey = makeCacheKey(key, params);

    const TTL = options.TTL ?? 5 * 60 * 1000;
    const retries = options.retries ?? 0;
    const retryDelay = options.retryDelay ?? 1000;
    const { dispatch, getState } = store as { dispatch: AppDispatch; getState: () => RootState };

    const state = getState().api.cache[cacheKey];
    if (
      !options.force &&
      state?.status === "success" &&
      Date.now() - (state.timestamp || 0) < TTL
    ) {
      return state.data;
    }

    if (inflight[cacheKey]) return inflight[cacheKey];

    dispatch(startQuery(cacheKey));

    inflight[cacheKey] = (async () => {
      let attempt = 0;
      while (true) {
        try {
          const res = await apiFn(params);
          dispatch(successQuery({ key: cacheKey, data: res.data, tags: options.tags }));
          return res.data;
        } catch (err) {
          if (attempt < retries) {
            attempt++;
            await new Promise((r) => setTimeout(r, retryDelay));
            continue;
          }
          dispatch(errorQuery({ key: cacheKey, error: err }));
          throw err;
        } finally {
          delete inflight[cacheKey];
        }
      }
    })();

    return inflight[cacheKey];
  };
