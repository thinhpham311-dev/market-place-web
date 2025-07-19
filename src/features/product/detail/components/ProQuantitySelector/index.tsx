"use client";
import * as React from "react";
import { memo } from "react";

// ui
import { Counter, ICounterRef, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import QuantityInfo from "./QuantityInfo";

// hooks
import { useQuantitySelector } from "./hooks";
import { injectReducer } from "@/store";
import reducer from "./store";

interface ProQuantitySelectorProps {
    quantity: number; // Maximum quantity available
}

export interface ProQuantitySelectorRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

injectReducer("quantity", reducer)

const ProQuantitySelector = React.forwardRef<
    ProQuantitySelectorRef,
    ProQuantitySelectorProps
>(({ quantity }, ref) => {
    const counterRef = React.useRef<ICounterRef>(null);

    const {
        currentQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity,
        validateQuantity,
    } = useQuantitySelector(quantity);

    React.useImperativeHandle(ref, () => ({
        validateQuantity: () => validateQuantity(currentQuantity),
        getCurrentQuantity: () => currentQuantity,
        resetQuantity: () => {
            resetQuantity();
            counterRef.current?.reset?.();
        },
    }));

    return (
        <Card layout="horizontal" className=" items-center border-none shadow-none">
            <CardHeader className="p-3">
                <CardTitle className="text-sm"> Quantity:</CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex flex-row items-center space-x-2">
                <Counter
                    initialValue={1}
                    ref={counterRef}
                    onQuantityChange={handleQuantityChange}
                />
                <QuantityInfo quantity={quantity} errorMessages={errorMessages} />
            </CardContent>
        </Card>
    );
});

export default memo(ProQuantitySelector);
