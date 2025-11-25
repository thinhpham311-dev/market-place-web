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

//constants
import { ERROR_QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants"


const QuantitySelectorCounter = () => {
    const counterRef = useRef<ICounterRef>(null);

    const {
        getValidate,
        updateQuantity,
        maxQuantity,
        currentQuantity,
        isDisableQuantity,
        resetQuantity
    } = useQuantitySelectorContext();

    React.useEffect(() => {
        if (!maxQuantity || maxQuantity === 0) {
            resetQuantity();
            counterRef.current?.reset?.();
        }
    }, [maxQuantity, resetQuantity]);

    const handleUpdateQuantity = (value: number) => {
        getValidate(value, [ERROR_QUANTITY_COUNTER]);
        updateQuantity(value);
    };


    return (
        <CardContent className="p-3 space-x-3 flex items-center">
            <Counter
                initialValue={currentQuantity}
                maxValue={maxQuantity}
                ref={counterRef}
                onQuantityChange={handleUpdateQuantity}
                isDisabled={isDisableQuantity}
            />
        </CardContent>
    );
}

export default QuantitySelectorCounter
