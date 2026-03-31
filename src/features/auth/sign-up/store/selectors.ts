import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { SIGN_UP_KEY } from "@/features/auth/sign-up/constants";

export const makeSelectSignUpState = (storeKey: string) =>
  createSelector(
    (state: RootState) => state[`${SIGN_UP_KEY}_${storeKey}`]?.data ?? null,
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
const signUpSelectorsCache: Record<string, ReturnType<typeof makeSelectSignUpState>> = {};
const cacheKeys: string[] = [];

export const selectSignUpByStoreKey = (storeKey: string) => {
  if (!signUpSelectorsCache[storeKey]) {
    signUpSelectorsCache[storeKey] = makeSelectSignUpState(storeKey);
    cacheKeys.push(storeKey);

    if (cacheKeys.length > MAX_CACHE_SIZE) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        delete signUpSelectorsCache[oldestKey];
      }
    }
  }

  return signUpSelectorsCache[storeKey];
};
