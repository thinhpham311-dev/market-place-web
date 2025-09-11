'use client';

import React from "react";

import SkuProvider from "./providers";

import { useFetchData } from "./hooks";
import { useProContext } from "../hooks/useProContext";
import { SKU_KEY } from "@/features/product/sku/constants";

export default function SkuDetailWrapper({ children }: { children?: React.ReactNode }) {
    const { product_id, variants } = useProContext()
    const skuData = useFetchData({
        product_id,
        storeKey: SKU_KEY,
        variants
    });

    return (
        <SkuProvider contextValues={{ ...skuData }}>
            {children}
        </SkuProvider>
    );
}
