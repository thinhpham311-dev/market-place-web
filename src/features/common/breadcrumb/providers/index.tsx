"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { BreadcrumbItem, GetHrefFn, GetLabelFn } from "../types";

interface BreadcrumbContextType {
    items?: BreadcrumbItem[] | BreadcrumbItem;
    getHref: GetHrefFn;
    getLabel: GetLabelFn;
    isDisableLast?: boolean;
}

interface BreadcrumbProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: BreadcrumbContextType;
}

// ✅ Tạo context có kiểu dữ liệu
export const BreadcrumbContext = React.createContext<BreadcrumbContextType | null>(null);

const BreadcrumbProvider = ({ children, className, contextValues }: BreadcrumbProviderProps) => {
    return (
        <BreadcrumbContext.Provider value={{ ...contextValues }}>
            <div className={cn(className)}>
                {children}
            </div>
        </BreadcrumbContext.Provider>
    );
};

export default BreadcrumbProvider;
