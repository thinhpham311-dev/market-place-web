import { RootState } from "@/store";
import { QUANTITY_COUNTER } from "../constants";
/**
 * Base selector — return primitive only to avoid rerenders
 */
const makeQuantityBaseSelector = (reducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[`${QUANTITY_COUNTER}_${reducerKey}`]?.state?.[storeKey];

/**
 * Cache theo dạng:
 * selectorCache[reducerKey][storeKey]
 */
const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeQuantityBaseSelector>>
> = {};

/**
 * Public API — ALWAYS use reducerKey, not reducerKey
 */
export const selectQuantitySelector = (
    reducerKey: string,
    storeKey: string
) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }

    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] =
            makeQuantityBaseSelector(reducerKey, storeKey);
    }

    return selectorCache[reducerKey][storeKey];
};
