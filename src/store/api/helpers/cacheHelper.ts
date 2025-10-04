// smartCacheFetch.ts
import { AppDispatch, RootState } from "@/store";
import {
    startQuery,
    successQuery,
    errorQuery,
} from "@/store/api/apiCacheSlice";

type FetchFn<TParams, TResponse> = (params: TParams) => Promise<{ data: TResponse }>;

interface CacheOptions {
    TTL?: number;
    retries?: number;
    retryDelay?: number;
    tags?: string[];
    force?: boolean;
}

const inflight: Record<string, Promise<any> | undefined> = {};

function stableStringify(obj: any): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
}
function makeCacheKey(prefix: string, params?: object) {
    if (!params || Object.keys(params).length === 0) {
        return prefix; // không nối thêm {}
    }
    return `${prefix}-${stableStringify(params)}`;
}

export async function smartCacheFetch<TParams extends object, TResponse>(
    prefix: string,
    params: TParams,
    apiFn: FetchFn<TParams, TResponse>,
    getState: () => RootState,
    dispatch: AppDispatch,
    options: CacheOptions = {}
): Promise<TResponse> {
    const cacheKey = makeCacheKey(prefix, params);
    const TTL = options.TTL ?? 5 * 60 * 1000;
    const retries = options.retries ?? 0;
    const retryDelay = options.retryDelay ?? 1000;

    const state = getState().api.cache[cacheKey];
    if (!options.force && state?.status === "success" && state.timestamp && Date.now() - state.timestamp < TTL) {
        return state.data as TResponse;
    }

    if (inflight[cacheKey]) return inflight[cacheKey]!;

    dispatch(startQuery(cacheKey));

    inflight[cacheKey] = (async () => {
        let attempt = 0;
        while (true) {
            try {
                const response = await apiFn(params);
                dispatch(successQuery({ key: cacheKey, data: response.data, tags: options.tags }));
                return response.data;
            } catch (err) {
                if (attempt < retries) {
                    attempt++;
                    await new Promise((res) => setTimeout(res, retryDelay));
                    continue;
                }
                dispatch(errorQuery({ key: cacheKey, error: err }));
                throw err;
            } finally {
                delete inflight[cacheKey];
            }
        }
    })();

    return inflight[cacheKey]!;
}
