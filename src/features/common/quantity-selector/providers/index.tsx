"use client";

import React from "react";

import { cn } from "@/utils/styles"

interface IQuantitySelectorContextType {
    title?: string,
    layout?: "vertical" | "horizontal",
    maxQuantity?: number,
    currentQuantity: number,
    updateQuantity: (n: number) => void,
    resetQuantity: () => void,
    getValidate: (n: number, m: string[]) => void,
    isDisabledQuantity: boolean

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
