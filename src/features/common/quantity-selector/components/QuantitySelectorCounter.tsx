"use client";
import * as React from "react";
import { useRef } from "react";

// ui
import {
    Counter,
    ICounterRef,
    CardContent,
    Card,
} from "@/components/ui";

//components
import ProQuantitySelectorStock from "./QuantitySelectorStock";


// hooks
import { useQuantitySelectorContext } from "../hooks";


const QuantitySelectorCounter = () => {
    const counterRef = useRef<ICounterRef>(null);

    const {
        handleQuantityChange,
        resetQuantity,
        maxQuantity,
        itemQuantity,
    } = useQuantitySelectorContext();


    React.useEffect(() => {
        if (maxQuantity === 0) {
            resetQuantity();
            counterRef.current?.reset?.();
        }
    }, [maxQuantity, resetQuantity]);

    return (
        <Card className="col-span-10 border-none shadow-none">
            <CardContent className="p-3 space-x-3 flex items-center">
                <Counter
                    initialValue={itemQuantity}
                    maxValue={maxQuantity}
                    ref={counterRef}
                    onQuantityChange={handleQuantityChange}
                    isDisabled={maxQuantity === 0}
                />
                <ProQuantitySelectorStock />
            </CardContent>
        </Card>
    );
}

export default QuantitySelectorCounter
