"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { VariantOption } from "../types";


interface VariantsSelectorContextType {
    variants: VariantOption[];
    sku_tier_idx: (number | null)[];
    validationErrors: Record<number, string>;
    handleChooseOption: (index: number, option: number | null) => void;
    validateOptions: () => Record<number, string>;
    resetValidationErrors: () => void;
}


interface VariantsSelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: VariantsSelectorContextType
}

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
