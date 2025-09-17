"use client";
import * as React from "react";


// components
import QuantitySelectorWrapper from "./QuantitySelectorWrapper";
import ProQuantitySelectorTitle from "./QuantitySelectorTitle";
import ProQuantitySelectorCounter from "./QuantitySelectorCounter";
import ProQuantitySelectorMessage from "./QuantitySelectorMessage";

//providers
import QuantitySelectorProvider from "./providers";

//hooks
import { useHandleQuantitySelector } from "./hooks";

interface IQuantitySelectorProps {
    storeKey: string;
    initialValue: number;
    maxQuantity?: number;

}

const SkuQuantitySelector = ({ storeKey, initialValue = 1, maxQuantity = 0 }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ storeKey, initialValue, maxQuantity });

    return (
        <QuantitySelectorProvider contextValues={{ ...quantitySelector }}>
            <QuantitySelectorWrapper>
                <ProQuantitySelectorTitle />
                <ProQuantitySelectorCounter />
                <ProQuantitySelectorMessage />
            </QuantitySelectorWrapper>
        </QuantitySelectorProvider>
    );
}

export default SkuQuantitySelector
