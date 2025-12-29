"use client";

import React from "react";
import { cn } from "@/utils/styles";

interface PaginationContextType {
  currentPage: number;
  pages: (number | string)[];
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  isShowDot?: boolean;
  isShowNav?: boolean;
  isShowLabel?: boolean;
  resetPagination: () => void;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

interface PaginationProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: PaginationContextType;
}

export const PaginationContext = React.createContext<PaginationContextType | null>(null);

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
  className,
  contextValues,
}) => {
  return (
    <PaginationContext.Provider value={{ ...contextValues }}>
      <div className={cn(className)}>{children}</div>
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
