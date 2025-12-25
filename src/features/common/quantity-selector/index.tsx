"use client";
import React, { memo } from "react";

// components
import QuantitySelectorWrapper from "./components/QuantitySelectorWrapper";
import QuantitySelectorTitle from "./components/QuantitySelectorTitle";
import QuantitySelectorCounter from "./components/QuantitySelectorCounter";
import QuantitySelectorStock from "./components/QuantitySelectorStock";

// providers
import QuantitySelectorProvider from "./providers";

// hooks
import { useHandleQuantitySelector } from "./hooks";

import { IQuantity } from "./store/initial";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

interface IQuantitySelectorProps {
    storeKey: string;
    initialValue: IQuantity;
    maxQuantity: number;
    layout?: "vertical" | "horizontal";
    title?: string;
    onChangeQuantity?: (value: number) => void;
}

const QuantitySelector = React.forwardRef<
    HTMLDivElement,
    IQuantitySelectorProps
>(({
    storeKey = "",
    initialValue,
    maxQuantity,
    ...rest
}, ref) => {

    const quantitySelector = useHandleQuantitySelector({
        reducerKey: QUANTITY_COUNTER,
        storeKey,
        initialValue,
        maxQuantity,
        ...rest
    });

    return (
        <QuantitySelectorProvider contextValues={{ ...quantitySelector, ...rest }}>
            <div ref={ref}>
                <QuantitySelectorWrapper>
                    <QuantitySelectorTitle />
                    <QuantitySelectorCounter />
                    <QuantitySelectorStock />
                </QuantitySelectorWrapper>
            </div>
        </QuantitySelectorProvider>
    );
});

QuantitySelector.displayName = "QuantitySelector";

export default memo(QuantitySelector);
