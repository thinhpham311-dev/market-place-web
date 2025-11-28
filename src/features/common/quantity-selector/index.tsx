"use client";
import { memo } from "react";


// components
import QuantitySelectorWrapper from "./components/QuantitySelectorWrapper";
import QuantitySelectorTitle from "./components/QuantitySelectorTitle";
import QuantitySelectorCounter from "./components/QuantitySelectorCounter";
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
    layout?: "vertical" | "horizontal";
    title?: string;
    onChangeQuantity?: (value: number) => void
    isDisabled: boolean
}

const QuantitySelector = ({ reducerKey = "", storeKey = "", initialQuantity, maxQuantity, ...rest }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ reducerKey, storeKey, initialQuantity, maxQuantity, ...rest });

    return (
        <QuantitySelectorProvider contextValues={{ ...quantitySelector, ...rest }}>
            <QuantitySelectorWrapper>
                <QuantitySelectorTitle />
                <QuantitySelectorCounter />
                <QuantitySelectorStock />
            </QuantitySelectorWrapper>
        </QuantitySelectorProvider>
    );
}

export default memo(QuantitySelector)
