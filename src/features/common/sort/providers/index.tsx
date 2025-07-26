"use client";

import React from "react";
import { injectReducer } from "@/store";
import reducer from "../store";
import { cn } from "@/lib/utils";
import type { Sort } from "../types";
import { useSortBy } from '@/features/common/sort/hooks';


injectReducer("sortBy", reducer);

export interface SortByContextType {
    sortBy: Sort;
    setSortBy: (value: Sort) => void;
    resetSortBy: () => void;
    options?: readonly Sort[];
}

interface SortByProviderProps {
    children?: React.ReactNode;
    className?: string;
    data?: Sort[]
}

export const SortByContext = React.createContext<SortByContextType | null>(null);

const SortByProvider = ({
    children,
    className,
    ...rest
}: SortByProviderProps) => {
    const { data } = rest
    const depsSortBy = useSortBy(data)

    return (
        <SortByContext.Provider value={depsSortBy}>
            <div className={cn(className)}>{children}</div>
        </SortByContext.Provider>
    );
};

export default SortByProvider;
