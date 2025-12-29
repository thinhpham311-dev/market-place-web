"use client";

import React from "react";
import { cn } from "@/utils/styles";

interface InfiniteScrollContextType {
  currentPage: number;
  totalPages: number;
  limit: number;
  updatePage: (page: number) => void;
  goToNextPage: (page: number) => void;
  resetInfiniteScroll: () => void;
}

interface InfiniteScrollProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: InfiniteScrollContextType;
}

export const InfiniteScrollContext = React.createContext<InfiniteScrollContextType | null>(null);

const InfiniteScrollProvider: React.FC<InfiniteScrollProviderProps> = ({
  children,
  className,
  contextValues,
}) => {
  return (
    <InfiniteScrollContext.Provider value={{ ...contextValues }}>
      <div className={cn(className)}>{children}</div>
    </InfiniteScrollContext.Provider>
  );
};

export default InfiniteScrollProvider;
