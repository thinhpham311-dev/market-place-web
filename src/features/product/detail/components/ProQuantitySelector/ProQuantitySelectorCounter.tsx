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
import ProQuantitySelectorStock from "./ProQuantitySelectorStock";


// hooks
import { useProQuantitySelectorContext } from "./hooks";


const ProQuantitySelectorCounter = () => {
    const counterRef = useRef<ICounterRef>(null);

    const {
        handleQuantityChange,
        resetQuantity,
        maxQuantity,
        currentQuantity,
    } = useProQuantitySelectorContext();


    React.useEffect(() => {
        if (maxQuantity === 0) {
            resetQuantity();
            counterRef.current?.reset?.();
        }
    }, [maxQuantity, resetQuantity]);

    return (
        <CardContent className="p-3 col-span-10 space-x-3 flex items-center">
            <Counter
                initialValue={currentQuantity}
                ref={counterRef}
                onQuantityChange={handleQuantityChange}
                isDisabled={maxQuantity === 0}
            />
            <ProQuantitySelectorStock />
        </CardContent>
    );
}

export default ProQuantitySelectorCounter
