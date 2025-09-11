"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { VariantOption } from "@/interfaces/spu";
import SpuDetailWrapper from "@/features/product/spu";
import SkuDetailWrapper from "@/features/product/sku";

interface IProContextType {
    product_id: string;
    variants?: VariantOption[];
    quantity?: number;
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
    contextValues
}) => {
    return (
        <ProContext.Provider value={{ ...contextValues }}>
            <SpuDetailWrapper>
                <SkuDetailWrapper>
                    <div className={cn(className)}>{children}</div>
                </SkuDetailWrapper>
            </SpuDetailWrapper>
        </ProContext.Provider >
    );
};

export default ProProvider;
