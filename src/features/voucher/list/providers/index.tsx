"use client";

import React from "react";
import { cn } from "@/utils/styles";
import type { VoucherListContextType } from "@/features/voucher/list/types";

interface VoucherListProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: VoucherListContextType;
}

export const VoucherListContext = React.createContext<VoucherListContextType | null>(null);

const VoucherListProvider = ({ children, className, contextValues }: VoucherListProviderProps) => {
  return (
    <VoucherListContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </VoucherListContext.Provider>
  );
};

export default VoucherListProvider;
