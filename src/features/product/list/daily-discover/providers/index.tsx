"use client";

import React from "react";
import { cn } from "@/utils/styles";
import type { DailyDiscoverContextType } from "@/features/product/list/daily-discover/types";

interface DailyDiscoverProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: DailyDiscoverContextType;
}

export const DailyDiscoverContext = React.createContext<DailyDiscoverContextType | null>(null);

const DailyDiscoverProvider = ({
  children,
  className,
  contextValues,
}: DailyDiscoverProviderProps) => {
  return (
    <DailyDiscoverContext.Provider value={contextValues}>
      <div className={cn(className)}>{children}</div>
    </DailyDiscoverContext.Provider>
  );
};

export default DailyDiscoverProvider;
