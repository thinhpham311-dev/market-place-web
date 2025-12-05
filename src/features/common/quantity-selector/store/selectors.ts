import { RootState } from "@/store";
import { QUANTITY_COUNTER } from "../constants";

/**
 * Base selector: lấy state tương ứng theo reducerKey + storeKey
 */
const makeQuantityBaseSelector = (reducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[`${QUANTITY_COUNTER}_${reducerKey}`]?.state?.[storeKey]

/**
 * Cache để đảm bảo mỗi selector chỉ được tạo 1 lần
 */
const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeQuantityBaseSelector>>
> = {};

/**
 * Public API — dùng trong component
 */
export const selectQuantitySelector = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }

    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeQuantityBaseSelector(reducerKey, storeKey);
    }

    return selectorCache[reducerKey][storeKey];
};
