import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { SHOP_KEY } from "@/features/shop/constants";

export const makeSelectShopInfoState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[`${SHOP_KEY}_${storeKey}`]?.data ?? null,
    (data) => ({
      shopInfo: data?.shopInfo,
      loading: data?.loading,
      status: data?.status,
      error: data?.error,
    }),
  );

const MAX_CACHE_SIZE = 100;
const shopInfoSelectorsCache: Record<string, ReturnType<typeof makeSelectShopInfoState>> = {};

const cacheKeys: string[] = [];

export const selectShopInfoByStoreKey = (storeKey: string) => {
  if (!shopInfoSelectorsCache[storeKey]) {
    shopInfoSelectorsCache[storeKey] = makeSelectShopInfoState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        delete shopInfoSelectorsCache[oldestKey];
      }
    }
  }

  return shopInfoSelectorsCache[storeKey];
};
