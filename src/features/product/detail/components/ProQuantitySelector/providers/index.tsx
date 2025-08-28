"use client";

import React from "react";

import { cn } from "@/lib/utils"

interface ProQuantitySelectorContextType {
    maxQuantity: number,
    currentQuantity: number,
    errorMessages: string[],
    handleQuantityChange: (n: number) => void,
    resetQuantity: () => void,
    validateQuantity: (n: number) => string[],
}

interface ProQuantitySelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: ProQuantitySelectorContextType
}

export const ProQuantitySelectorContext = React.createContext<ProQuantitySelectorContextType | null>(null);

const ProQuantitySelectorProvider = ({ children, className, contextValues }: ProQuantitySelectorProviderProps) => {
    return (
        <ProQuantitySelectorContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </ProQuantitySelectorContext.Provider>
    );
};

export default ProQuantitySelectorProvider;
