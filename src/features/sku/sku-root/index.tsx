'use client';

import React from "react";

import SkuProvider from "@/features/sku/providers";

import { useFetchData } from "@/features/sku/hooks";

interface ISkuDetailWrapperProps {
    children?: React.ReactNode
    storeKey: string
    sku_tier_idx: number[];
    product_id: string;
    optionsCount: number;
}

export default function SkuDetailWrapper({
    children,
    storeKey,
    ...rest
}: ISkuDetailWrapperProps) {
    const skuData = useFetchData({
        storeKey,
        ...rest
    });

    return (
        <SkuProvider contextValues={{ ...skuData }}>
            {children}
        </SkuProvider>
    );
}
