"use client";

import React from "react";

import { cn } from "@/utils/styles"


interface IPriceDisplaySelectorContextType {
    defaultPrice: number;
    currentPrice: number;
    flashSalePrice: number;
    minPrice: number;
    maxPrice: number;
    setPrice: (val: number) => void;
    setFlashSalePrice: (val: number) => void;
    setDefaultPrice: (val: number) => void;
    setLoading: (val: boolean) => void;
    setError: (err: string | { message?: string } | null) => void;
    resetPrice: () => void;
    loading: boolean;
    error: string | { message?: string } | null;
}

interface IPriceDisplayProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IPriceDisplaySelectorContextType
}

export const PriceDisplaySelectorContext = React.createContext<IPriceDisplaySelectorContextType | null>(null);

const PriceDisplayProvider = ({ children, className, contextValues }: IPriceDisplayProviderProps) => {
    return (
        <PriceDisplaySelectorContext.Provider value={{ ...contextValues }}>
            <div className={cn(className)}>
                {children}
            </div>
        </PriceDisplaySelectorContext.Provider>
    );
};

export default PriceDisplayProvider;
