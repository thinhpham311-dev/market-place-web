import { RootState } from "@/store";

const makePriceDisplayBaseSelector = (reducerKey: string, storeKey: string) => (state: RootState) =>
  state[reducerKey]?.state?.[storeKey];

/**
 * Cache để đảm bảo mỗi selector chỉ được tạo 1 lần
 */
const selectorCache: Record<
  string,
  Record<string, ReturnType<typeof makePriceDisplayBaseSelector>>
> = {};

export const selectPriceDisplaySelector = (reducerKey: string, storeKey: string) => {
  if (!selectorCache[reducerKey]) {
    selectorCache[reducerKey] = {};
  }

  if (!selectorCache[reducerKey][storeKey]) {
    selectorCache[reducerKey][storeKey] = makePriceDisplayBaseSelector(reducerKey, storeKey);
  }

  return selectorCache[reducerKey][storeKey];
};
