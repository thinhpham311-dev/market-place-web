"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiSignUp } from "@/services/AuthService";
import { IUser } from "@/interfaces/user";

type SignUpResponse = {
  message?: string;
  hasSession?: boolean;
  user?: unknown;
};

export function useSignUp() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUp = async (values: IUser) => {
    try {
      setIsSubmitting(true);

      const response = (await apiSignUp(values)) as { data: SignUpResponse };
      const message = response.data?.message || "Your account has been created successfully.";

      toast.success(message);

      if (response.data?.hasSession) {
        router.push("/");
        router.refresh();
        return;
      }

      router.push("/user/sign-in");
      router.refresh();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Sign up failed. Please try again.";

      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    signUp,
    isSubmitting,
  };
}
