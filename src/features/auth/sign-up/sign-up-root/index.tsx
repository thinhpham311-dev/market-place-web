"use client";

import SignUpCard from "@/features/auth/sign-up/components/SignUpCard";
import { useSignUp } from "@/features/auth/sign-up/hooks/useSignUp";
import SignUpProvider from "@/features/auth/sign-up/providers";

export default function SignUpRoot() {
  const signUpData = useSignUp();

  return (
    <SignUpProvider
      className="flex flex-1 w-auto mx-10"
      contextValues={{
        signUp: signUpData.signUp,
        isSubmitting: signUpData.isSubmitting,
      }}
    >
      <SignUpCard />
    </SignUpProvider>
  );
}
