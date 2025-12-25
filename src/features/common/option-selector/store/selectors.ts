import { RootState } from "@/store";


const makeSelectOptionsBaseSelector = (reducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[reducerKey]?.state?.[storeKey]

const selectorCache: Record<
    string,
    Record<string, ReturnType<typeof makeSelectOptionsBaseSelector>>
> = {};


export const selectOptionsSelector = (reducerKey: string, storeKey: string) => {
    if (!selectorCache[reducerKey]) {
        selectorCache[reducerKey] = {};
    }
    if (!selectorCache[reducerKey][storeKey]) {
        selectorCache[reducerKey][storeKey] = makeSelectOptionsBaseSelector(reducerKey, storeKey);
    }
    return selectorCache[reducerKey][storeKey];
};
