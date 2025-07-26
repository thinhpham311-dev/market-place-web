"use client";

import React from "react";
import { injectReducer } from "@/store";
import reducer from "@/features/common/pagination/store";
import { usePagination } from "@/features/common/pagination/hooks";
import { cn } from "@/lib/utils";

injectReducer("pagination", reducer);

interface PaginationContextType {
    currentPage: number;
    pages: (number | string)[];
    setPage: (page: number) => void;
    hasPrev: boolean;
    hasNext: boolean;
    resetPagination: () => void;
    totalPages: number;
    limit: number;
}

interface PaginationProviderProps {
    children?: React.ReactNode;
    className?: string;
    total: number;
    limit: number;
}

// ✅ Context có kiểu dữ liệu chính xác
export const PaginationContext = React.createContext<PaginationContextType | null>(null);

const PaginationProvider: React.FC<PaginationProviderProps> = ({
    children,
    className,
    total,
    limit,
}) => {
    // ✅ Sử dụng hook theo chuẩn mới
    const depsPagination = usePagination({ totalItems: total, limit });

    return (
        <PaginationContext.Provider value={depsPagination}>
            <div className={cn(className)}>{children}</div>
        </PaginationContext.Provider>
    );
};

export default PaginationProvider;
