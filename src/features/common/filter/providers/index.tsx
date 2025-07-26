"use client";

import React from "react";
import { injectReducer } from "@/store";
import reducer from "@/features/common/filter/store";
import { cn } from "@/lib/utils"
import { Filter } from "../types";
import { useFilter } from '@/features/common/filter/hooks';


injectReducer("filter", reducer);

interface FilterContextType {
    filters?: Filter
    data?: Filter
    handleSetFilter: (key: string, value: any) => void
    handleResetFilter: (key: string) => void
    handleResetAllFilters: () => void
}

interface FilterProviderProps {
    children?: React.ReactNode;
    className?: string;
    data?: Filter
}

// ✅ Tạo context có kiểu dữ liệu
export const FilterContext = React.createContext<FilterContextType | null>(null);

const FilterProvider = ({ children, className, ...rest }: FilterProviderProps) => {
    const { data } = rest
    const depsFilter = useFilter(data);
    return (
        <FilterContext.Provider
            value={{ ...depsFilter, data }}
        >
            <div className={cn(className)}>
                {children}
            </div>
        </FilterContext.Provider>
    );
};

export default FilterProvider;
