// store/middleware/apiCacheMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { setCache } from "@/store/api/apiCacheSlice";

interface ApiFetchAction {
    type: "api/fetch";
    payload: {
        key: string;
        url: string;
        options?: RequestInit;
        ttl?: number;
        onSuccess: (data: any) => any;
        onError?: (error: any) => any;
    };
}

// type guard
function isApiFetchAction(action: any): action is ApiFetchAction {
    return action.type === "api/fetch";
}

export const apiCacheMiddleware: Middleware =
    ({ getState, dispatch }) =>
        (next) =>
            async (action) => {
                if (!isApiFetchAction(action)) {
                    return next(action);
                }

                const { key, url, options, ttl = 5 * 60 * 1000, onSuccess, onError } =
                    action.payload;

                const cache = (getState() as any).apiCache?.[key];

                if (cache && Date.now() - cache.timestamp < ttl) {
                    dispatch(onSuccess(cache.data));
                    return;
                }

                try {
                    const res = await fetch(url, options);
                    const data = await res.json();
                    dispatch(setCache({ key, data }));
                    dispatch(onSuccess(data));
                } catch (error) {
                    if (onError) dispatch(onError(error));
                }
            };
