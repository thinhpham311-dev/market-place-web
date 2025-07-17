"use client";
import * as React from "react";
import { memo } from "react";

// ui
import { Counter, ICounterRef } from "@/components/ui";
import QuantityInfo from "./QuantityInfo"

interface ProQuantitySelectorProps {
    quantity: number; // Maximum quantity available
}

export interface ProQuantitySelectorRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

const ProQuantitySelector = React.forwardRef<
    ProQuantitySelectorRef,
    ProQuantitySelectorProps
>(({ quantity }, ref) => {
    const counterRef = React.useRef<ICounterRef>(null);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const [currentQuantity, setCurrentQuantity] = React.useState<number>(1);

    const validateQuantity = (newQuantity: number) => {
        if (newQuantity > quantity) {
            return [
                `If more quantity is added, purchase limit will be exceeded and price may change`,
            ];
        }
        return [];
    };

    React.useImperativeHandle(ref, () => ({
        validateQuantity: () => validateQuantity(currentQuantity),
        getCurrentQuantity: () => currentQuantity,
        resetQuantity: () => {
            setCurrentQuantity(1);
            counterRef.current?.reset?.();
            setErrorMessages([]);
        },
    }));

    const handleQuantityChange = (newQuantity: number) => {
        setCurrentQuantity(newQuantity);
        setErrorMessages(validateQuantity(newQuantity));
    };

    return (
        <div className="flex flex-rows flex-wrap gap-3 items-center">
            <p className="basis-full font-bold">Quantity:</p>
            <Counter
                initialValue={1}
                ref={counterRef}
                onQuantityChange={handleQuantityChange}
            />
            <QuantityInfo
                quantity={quantity}
                errorMessages={errorMessages}
            />
        </div>
    );
});

export default memo(ProQuantitySelector);


