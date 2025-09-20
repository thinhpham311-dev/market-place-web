"use client";
import * as React from "react";


// components
import QuantitySelectorWrapper from "./components/QuantitySelectorWrapper";
import ProQuantitySelectorTitle from "./components/QuantitySelectorTitle";
import ProQuantitySelectorCounter from "./components/QuantitySelectorCounter";
import ProQuantitySelectorMessage from "./components/QuantitySelectorMessage";

//providers
import QuantitySelectorProvider from "./providers";

//hooks
import { useHandleQuantitySelector } from "./hooks";

interface IQuantitySelectorProps {
    storeKey: string;
    initialValue: number;
    maxQuantity?: number;
    loading: boolean;
    error?: string | { message?: string } | null;
}

const QuantitySelector = ({ storeKey, initialValue = 1, maxQuantity = 0, ...rest }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ storeKey, initialValue, maxQuantity });

    return (
        <QuantitySelectorProvider contextValues={{ ...quantitySelector, ...rest }}>
            <QuantitySelectorWrapper>
                <ProQuantitySelectorTitle />
                <ProQuantitySelectorCounter />
                <ProQuantitySelectorMessage />
            </QuantitySelectorWrapper>
        </QuantitySelectorProvider>
    );
}

export default QuantitySelector
