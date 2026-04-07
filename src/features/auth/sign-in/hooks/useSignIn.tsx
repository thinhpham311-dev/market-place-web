"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { IUser } from "@/interfaces/user";
import reducer from "@/features/auth/sign-in/store";
import { injectReducer, removeReducer } from "@/store";
import { SIGN_IN_DEFAULT_STORE_KEY, SIGN_IN_KEY } from "@/features/auth/sign-in/constants";
import { selectSignInByStoreKey } from "@/features/auth/sign-in/store/selectors";
import { postSignIn } from "@/features/auth/sign-in/store/dataSlice";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import { setUser } from "@/store/auth/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-storeIO";
import { useTranslation } from "@/lib/hooks/use-translation";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export function useSignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeKey = SIGN_IN_DEFAULT_STORE_KEY;

  useEffect(() => {
    const reducerKey = `${SIGN_IN_KEY}_${storeKey}`;
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [storeKey]);

  const { loading: isSubmitting = false } = useAppSelector(selectSignInByStoreKey(storeKey));

  const signIn = async (values: IUser) => {
    try {
      const response = await dispatch(postSignIn(values) as any).unwrap();
      const message = response.message || t("auth_sign_in_success");

      if (response.hasSession || response.token) {
        dispatch(onSignInSuccess(response.token || "http-only-session"));
      }

      if (response.user) {
        dispatch(setUser(response.user));
      }

      toast.success(message);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      const message = getApiErrorMessage(error, t("auth_sign_in_failed"));

      toast.error(message);
      throw error;
    }
  };

  return {
    signIn,
    isSubmitting,
  };
}
