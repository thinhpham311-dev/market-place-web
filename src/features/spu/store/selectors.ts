import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
//constants
import { SPU_KEY } from "@/features/spu/constants";

export const makeSelectSpuDetailState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[`${SPU_KEY}_${storeKey}`]?.data ?? null,
    (data) => ({
      spu: data?.spu,
      loading: data?.loading,
      status: data?.status,
      error: data?.error,
    }),
  );

const MAX_CACHE_SIZE = 100;
const spuDetailSelectorsCache: Record<string, ReturnType<typeof makeSelectSpuDetailState>> = {};

const cacheKeys: string[] = [];

export const selectSpuDetailByStoreKey = (storeKey: string) => {
  if (!spuDetailSelectorsCache[storeKey]) {
    spuDetailSelectorsCache[storeKey] = makeSelectSpuDetailState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        delete spuDetailSelectorsCache[oldestKey];
      }
    }
  }

  return spuDetailSelectorsCache[storeKey];
};
