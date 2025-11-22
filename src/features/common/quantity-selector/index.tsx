"use client";
import { memo } from "react";


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
    reducerKey: string;
    storeKey: string;
    initialQuantity: number;
    maxQuantity: number;
    loading: boolean;
    layout?: "vertical" | "horizontal";
    title?: string;
    error?: string | { message?: string } | null;
}

const QuantitySelector = ({ reducerKey = "", storeKey = "", initialQuantity, maxQuantity, ...rest }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ reducerKey, storeKey, initialQuantity, maxQuantity });

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

export default memo(QuantitySelector)
