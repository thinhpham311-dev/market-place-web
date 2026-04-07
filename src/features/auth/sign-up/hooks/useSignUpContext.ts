import { SignUpContext } from "@/features/auth/sign-up/providers";
import { useContextSafe } from "@/lib/hooks/use-context-safe";

export function useSignUpContext() {
  return useContextSafe(SignUpContext, "SignUpProvider");
}
