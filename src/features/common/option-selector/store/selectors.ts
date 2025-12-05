import { RootState } from "@/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants"


const makeSelectOptionsBaseSelector = (reducerKey: string, storeKey: string) =>
    (state: RootState) =>
        state[`${OPTION_SELECTOR}_${reducerKey}`]?.state?.[storeKey]

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
