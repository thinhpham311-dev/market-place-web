"use client";

import React from "react";
import { cn } from "@/utils/styles";
import type { VoucherDetailContextType } from "@/features/voucher/detail/types";

interface VoucherDetailProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: VoucherDetailContextType;
}

export const VoucherDetailContext = React.createContext<VoucherDetailContextType | null>(null);

const VoucherDetailProvider = ({
  children,
  className,
  contextValues,
}: VoucherDetailProviderProps) => {
  return (
    <VoucherDetailContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </VoucherDetailContext.Provider>
  );
};

export default VoucherDetailProvider;
