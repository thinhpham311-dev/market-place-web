"use client";
import * as React from "react";
import { useRef } from "react";

// ui
import {
    Counter,
    ICounterRef,
    CardContent,
} from "@/components/ui";

//components


// hooks
import { useQuantitySelectorContext } from "../hooks";


const QuantitySelectorCounter = () => {
    const counterRef = useRef<ICounterRef>(null);

    const {
        handleQuantityChange,
        resetQuantity,
        maxQuantity,
        currentQuantity,
    } = useQuantitySelectorContext();


    React.useEffect(() => {
        if (maxQuantity === 0) {
            resetQuantity();
            counterRef.current?.reset?.();
        }
    }, [maxQuantity, resetQuantity]);

    return (
        <CardContent className="p-3 space-x-3 flex items-center">
            <Counter
                initialValue={currentQuantity}
                maxValue={maxQuantity}
                ref={counterRef}
                onQuantityChange={handleQuantityChange}
                isDisabled={maxQuantity === 0}
            />
        </CardContent>
    );
}

export default QuantitySelectorCounter
