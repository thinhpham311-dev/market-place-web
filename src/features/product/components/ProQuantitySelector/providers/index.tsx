"use client";

import React from "react";

import { cn } from "@/lib/utils"

interface QuantitySelectorContextType {
    maxQuantity?: number,
    currentQuantity: number,
    errorMessages: string[],
    handleQuantityChange: (n: number) => void,
    resetQuantity: () => void,
    validateQuantity: (n: number) => string[],
}

interface QuantitySelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: QuantitySelectorContextType
}

export const QuantitySelectorContext = React.createContext<QuantitySelectorContextType | null>(null);

const QuantitySelectorProvider = ({ children, className, contextValues }: QuantitySelectorProviderProps) => {
    return (
        <QuantitySelectorContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </QuantitySelectorContext.Provider>
    );
};

export default QuantitySelectorProvider;
