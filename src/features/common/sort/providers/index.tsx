"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { Sort } from "../types";


export interface SortByContextType {
    sortBy: Sort;
    setSortBy: (value: Sort) => void;
    resetSortBy: () => void;
    options?: readonly Sort[];
}

interface SortByProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: SortByContextType;
}

export const SortByContext = React.createContext<SortByContextType | null>(null);

const SortByProvider = ({
    children,
    className,
    contextValues
}: SortByProviderProps) => {

    return (
        <SortByContext.Provider value={contextValues}>
            <div className={cn(className)}>{children}</div>
        </SortByContext.Provider>
    );
};

export default SortByProvider;
