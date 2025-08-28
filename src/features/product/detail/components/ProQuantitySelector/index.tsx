"use client";
import * as React from "react";


// components
import ProQuantitySelectorWrapper from "./ProQuantitySelectorWrapper";
import ProQuantitySelectorTitle from "./ProQuantitySelectorTitle";
import ProQuantitySelectorCounter from "./ProQuantitySelectorCounter";
import ProQuantitySelectorStock from "./ProQuantitySelectorStock";
import ProQuantitySelectorMessage from "./ProQuantitySelectorMessage";

//providers
import ProQuantitySelectorProvider from "./providers";

//hooks
import { useHandleQuantitySelector } from "./hooks";
import { useSkuDataContext } from "../ProSkuDardBoard/hooks";


interface IProQuantitySelectorProps {
    storeKey: string;
}

const ProQuantitySelector = ({ storeKey }: IProQuantitySelectorProps) => {
    const { skuProData } = useSkuDataContext();
    const maxQuantity = skuProData?.sku_stock ?? 0;
    const quantitySelector = useHandleQuantitySelector({ storeKey, maxQuantity });

    return (
        <ProQuantitySelectorProvider contextValues={{ ...quantitySelector }}>
            <ProQuantitySelectorWrapper>
                <ProQuantitySelectorTitle />
                <ProQuantitySelectorCounter />
                <ProQuantitySelectorMessage />
            </ProQuantitySelectorWrapper>
        </ProQuantitySelectorProvider>
    );
}

export default ProQuantitySelector
