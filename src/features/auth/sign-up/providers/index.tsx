"use client";

import React from "react";

import type { SignUpContextType } from "@/features/auth/sign-up/types";
import { cn } from "@/utils/styles";

interface SignUpProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: SignUpContextType;
}

export const SignUpContext = React.createContext<SignUpContextType | null>(null);

const SignUpProvider = ({ children, className, contextValues }: SignUpProviderProps) => {
  return (
    <SignUpContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
