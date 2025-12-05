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

import { IQuantity } from "./store/initial";

interface IQuantitySelectorProps {
    reducerKey: string;
    storeKey: string;
    initialValue: IQuantity;
    maxQuantity: number;
    layout?: "vertical" | "horizontal";
    title?: string;
    onChangeQuantity?: (value: number) => void
    isDisabled: boolean
}

const QuantitySelector = ({ reducerKey = "", storeKey = "", initialValue, maxQuantity, ...rest }: IQuantitySelectorProps) => {
    const quantitySelector = useHandleQuantitySelector({ reducerKey, storeKey, initialValue, maxQuantity, ...rest });

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
