"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { SkuPro } from "../types";

interface ProSkuDardBoardContextType {
    skuProData: SkuPro,
    loading: boolean,
    status: string,
    error: string | null
}


interface SkuDardBoardProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: ProSkuDardBoardContextType
}

export const ProSkuDardBoardContext = React.createContext<ProSkuDardBoardContextType | null>(null);

const ProSkuDardBoardProvider = ({ children, className, contextValues }: SkuDardBoardProviderProps) => {
    return (
        <ProSkuDardBoardContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </ProSkuDardBoardContext.Provider>
    );
};

export default ProSkuDardBoardProvider;
