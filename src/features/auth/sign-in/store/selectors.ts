import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { SIGN_IN_KEY } from "@/features/auth/sign-in/constants";

export const makeSelectSignInState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[`${SIGN_IN_KEY}_${storeKey}`]?.data ?? null,
    (data) => ({
      user: data?.user,
      hasSession: data?.hasSession,
      message: data?.message,
      loading: data?.loading,
      error: data?.error,
      status: data?.status,
    }),
  );

const MAX_CACHE_SIZE = 100;
const signInSelectorsCache: Record<string, ReturnType<typeof makeSelectSignInState>> = {};
const cacheKeys: string[] = [];

export const selectSignInByStoreKey = (storeKey: string) => {
  if (!signInSelectorsCache[storeKey]) {
    signInSelectorsCache[storeKey] = makeSelectSignInState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        delete signInSelectorsCache[oldestKey];
      }
    }
  }

  return signInSelectorsCache[storeKey];
};
