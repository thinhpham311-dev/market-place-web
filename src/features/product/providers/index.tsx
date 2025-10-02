"use client";

import React from "react";
import { cn } from "@/lib/utils";
// Actions and selectors

interface IProContextType {
    product_id: string;
    shop_id: string;
    sku_tier_idx: number[];
    currentQuantity: number;
    optionsCount: number;
}

interface IProProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IProContextType;
}

export const ProContext = React.createContext<IProContextType | null>(null);

const ProProvider: React.FC<IProProviderProps> = ({
    children,
    className,
    contextValues,
}) => {

    return (
        <ProContext.Provider value={{ ...contextValues }}>
            <div className={cn(className)}>{children}</div>
        </ProContext.Provider>
    );
};

export default ProProvider;
