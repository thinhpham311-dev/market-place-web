"use client";

import React from "react";
import { cn } from "@/utils/styles";
import { ISkuPro } from "@/interfaces/sku";


interface SkuContextType {
    sku: ISkuPro,
    loading: boolean,
    error: string,
    status: "idle" | "loading" | "success" | "error",
}

interface SkuProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: SkuContextType;
}

export const SkuContext = React.createContext<SkuContextType | null>(null);


const SkuProvider: React.FC<SkuProviderProps> = ({
    children,
    className,
    contextValues
}) => {
    return (
        <SkuContext.Provider value={{ ...contextValues }}>
            <div className={cn(className)}>{children}</div>
        </SkuContext.Provider>
    );
};

export default SkuProvider;
