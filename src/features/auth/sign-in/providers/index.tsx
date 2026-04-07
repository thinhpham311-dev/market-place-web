"use client";

import React from "react";
import { cn } from "@/utils/styles";
import type { SignInContextType } from "@/features/auth/sign-in/types";

interface SignInProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: SignInContextType;
}

export const SignInContext = React.createContext<SignInContextType | null>(null);

const SignInProvider = ({ children, className, contextValues }: SignInProviderProps) => {
  return (
    <SignInContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </SignInContext.Provider>
  );
};

export default SignInProvider;
