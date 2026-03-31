"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-storeIO";
import { toast } from "sonner";

import { IUser } from "@/interfaces/user";
import reducer from "@/features/auth/sign-up/store";
import { injectReducer, removeReducer } from "@/store";
import {
  SIGN_UP_DEFAULT_STORE_KEY,
  SIGN_UP_KEY,
} from "@/features/auth/sign-up/constants";
import { selectSignUpByStoreKey } from "@/features/auth/sign-up/store/selectors";
import { postSignUp } from "@/features/auth/sign-up/store/dataSlice";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setUser } from "@/store/auth/userSlice";

export function useSignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeKey = SIGN_UP_DEFAULT_STORE_KEY;

  useEffect(() => {
    const reducerKey = `${SIGN_UP_KEY}_${storeKey}`;
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [storeKey]);

  const { loading: isSubmitting = false } = useAppSelector(selectSignUpByStoreKey(storeKey));

  const signUp = async (values: IUser) => {
    try {
      const response = await dispatch(postSignUp(values) as any).unwrap();
      const message = response.message || "Your account has been created successfully.";

      if (response.hasSession || response.token) {
        dispatch(onSignInSuccess(response.token || "http-only-session"));
      }

      if (response.user) {
        dispatch(setUser(response.user));
      }

      toast.success(message);

      if (response.hasSession || response.token) {
        router.push("/");
        router.refresh();
        return;
      }

      if (values.email) {
        router.push(`/user/check-otp?email=${encodeURIComponent(values.email)}`);
        router.refresh();
        return;
      }

      router.push("/user/sign-in");
      router.refresh();
    } catch (error: any) {
      const message =
        (typeof error === "string" && error) ||
        error?.message ||
        error?.response?.data?.message ||
        "Sign up failed. Please try again.";

      toast.error(message);
      throw error;
    }
  };

  return {
    signUp,
    isSubmitting,
  };
}
