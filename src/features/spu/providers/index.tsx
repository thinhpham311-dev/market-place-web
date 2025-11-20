"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ISpuPro } from "@/interfaces/spu";


interface ISpuContextType {
    spu: ISpuPro,
    loading: boolean,
    error: string,
    status: "idle" | "loading" | "success" | "error",
}

interface ISpuProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: ISpuContextType;
}

export const SpuContext = React.createContext<ISpuContextType | null>(null);


const SpuProvider: React.FC<ISpuProviderProps> = ({
    children,
    className,
    contextValues
}) => {
    return (
        <SpuContext.Provider value={{ ...contextValues }}>
            <div className={cn(className)}>{children}</div>
        </SpuContext.Provider>
    );
};

export default SpuProvider;
