"use client";

import React from "react";

import { cn } from "@/utils/styles"
import { Filter } from "../types";


interface FilterContextType {
    data: Filter[],
    filter?: Filter
    handleSetFilter: (key: string, value: string | object) => void
    handleResetFilter: (key: string) => void
    handleResetAllFilters: () => void
}

interface FilterProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: FilterContextType
}

// ✅ Tạo context có kiểu dữ liệu
export const FilterContext = React.createContext<FilterContextType | null>(null);

const FilterProvider = ({ children, className, contextValues }: FilterProviderProps) => {
    return (
        <FilterContext.Provider value={contextValues}>
            <div className={cn(className)}>
                {children}
            </div>
        </FilterContext.Provider>
    );
};

export default FilterProvider;
