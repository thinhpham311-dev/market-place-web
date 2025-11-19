"use client";
import * as React from "react";


// components
import QuantitySelectorWrapper from "./components/QuantitySelectorWrapper";
import QuantitySelectorTitle from "./components/QuantitySelectorTitle";
import QuantitySelectorCounter from "./components/QuantitySelectorCounter";
import QuantitySelectorMessage from "./components/QuantitySelectorMessage";
import QuantitySelectorStock from "./components/QuantitySelectorStock";

//providers
import QuantitySelectorProvider from "./providers";

//hooks
import { useHandleQuantitySelector } from "./hooks";

interface IQuantitySelectorProps {
    storeKey: string;
    initialValue: number;
    maxQuantity?: number;
    loading: boolean;
    layout?: "vertical" | "horizontal";
    title?: string;
    error?: string | { message?: string } | null;
}

const QuantitySelector = ({ storeKey = "", initialValue = 1, maxQuantity = 0, ...rest }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ storeKey, initialValue, maxQuantity });

    return (
        <QuantitySelectorProvider contextValues={{ ...quantitySelector, ...rest }}>
            <QuantitySelectorWrapper>
                <QuantitySelectorTitle />
                <QuantitySelectorCounter />
                <QuantitySelectorStock />
                <QuantitySelectorMessage />
            </QuantitySelectorWrapper>
        </QuantitySelectorProvider>
    );
}

export default QuantitySelector
