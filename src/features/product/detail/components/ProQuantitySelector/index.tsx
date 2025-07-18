"use client";
import * as React from "react";
import { memo } from "react";

// ui
import { Counter, ICounterRef } from "@/components/ui";
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

    console.log(errorMessages)

    return (
        <div className="flex flex-rows flex-wrap gap-3 items-center">
            <p className="basis-full font-bold">Quantity:</p>
            <Counter
                initialValue={1}
                ref={counterRef}
                onQuantityChange={handleQuantityChange}
            />
            <QuantityInfo quantity={quantity} errorMessages={errorMessages} />
        </div>
    );
});

export default memo(ProQuantitySelector);
