"use client";

import React from "react";
import { cn } from "@/utils/styles";
import type { CheckoutContextType } from "@/features/checkout/types/context";

interface CheckoutProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: CheckoutContextType;
}

export const CheckoutContext = React.createContext<CheckoutContextType | null>(null);

const CheckoutProvider = ({ children, className, contextValues }: CheckoutProviderProps) => {
  return (
    <CheckoutContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
