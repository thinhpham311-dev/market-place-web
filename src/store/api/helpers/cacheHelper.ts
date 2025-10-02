import { RootState, AppDispatch } from "@/store";
import { setCache } from "@/store/api/apiCacheSlice";

type FetchFn<TParams, TResponse> = (params: TParams) => Promise<{ data: TResponse }>;

interface CacheOptions {
    TTL?: number;
}

function stableStringify(obj: any): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
}

function makeCacheKey(prefix: string, params: object) {
    return `${prefix}-${stableStringify(params)}`;
}

export async function getCacheOrFetch<TParams extends object, TResponse>(
    prefix: string,
    params: TParams,
    apiFn: FetchFn<TParams, TResponse>,
    getState: () => RootState,
    dispatch: AppDispatch,
    options: CacheOptions & { force?: boolean } = {}
): Promise<TResponse> {
    const cacheKey = makeCacheKey(prefix, params); // <-- tự tạo key dựa vào params
    const cache = getState().api.cache[cacheKey];
    const TTL = options.TTL ?? 5 * 60 * 1000;

    if (!options.force && cache && Date.now() - cache.timestamp < TTL) {
        return cache.data as TResponse;
    }

    const response = await apiFn(params);
    dispatch(setCache({ key: cacheKey, data: response.data as any }));
    return response.data;
}
