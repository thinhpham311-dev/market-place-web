"use client";

import React from "react";

import { cn } from "@/lib/utils"

interface IQuantitySelectorContextType {
    title?: string,
    layout?: "vertical" | "horizontal",
    maxQuantity?: number,
    currentQuantity: number,
    errorMessages: string[],
    handleQuantityChange: (n: number) => void,
    resetQuantity: () => void,
    validateQuantity: (n: number) => string[],
    loading: boolean;
    error?: string | { message?: string } | null;
}

interface IQuantitySelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IQuantitySelectorContextType
}

export const QuantitySelectorContext = React.createContext<IQuantitySelectorContextType | null>(null);

const QuantitySelectorProvider = ({ children, className, contextValues }: IQuantitySelectorProviderProps) => {
    return (
        <QuantitySelectorContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </QuantitySelectorContext.Provider>
    );
};

export default QuantitySelectorProvider;
