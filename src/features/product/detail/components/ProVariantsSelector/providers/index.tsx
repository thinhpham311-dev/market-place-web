"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { VariantOption } from "../types";


interface VariantsSelectorContextType {
    selectedOptions: VariantOption[],
    validationErrors: string[],
    handleChooseOption: (index: number, option: VariantOption | null) => void;
    validateOptions: () => string[];
}

interface VariantsSelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: VariantsSelectorContextType
}

// ✅ Tạo context có kiểu dữ liệu
export const VariantsSelectorContext = React.createContext<VariantsSelectorContextType | null>(null);

const VariantsSelectorProvider = ({ children, className, contextValues }: VariantsSelectorProviderProps) => {
    return (
        <VariantsSelectorContext.Provider value={contextValues}>
            <div className={cn(className)}>
                {children}
            </div>
        </VariantsSelectorContext.Provider>
    );
};

export default VariantsSelectorProvider;
