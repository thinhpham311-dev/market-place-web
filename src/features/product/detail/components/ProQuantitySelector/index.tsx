"use client";
import * as React from "react";
import { memo } from "react";

// ui
import { Counter, ICounterRef, Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui";
import { ErrorMessages } from "@/components/shared"


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
        <Card className="border-none shadow-none">
            <div className="grid grid-cols-12 items-center">
                <CardHeader className="p-3 col-span-2">
                    <CardTitle className="text-sm uppercase"> quantity:</CardTitle>
                </CardHeader>
                <CardContent className="p-3 col-span-10 space-x-3 flex items-center">
                    <Counter
                        initialValue={1}
                        ref={counterRef}
                        onQuantityChange={handleQuantityChange}
                    />
                    <CardDescription >{quantity} pieces available</CardDescription>
                </CardContent>
                <CardFooter className="col-span-10 col-start-3 px-3 py-0">
                    {errorMessages && errorMessages.length > 0 &&
                        <ErrorMessages messages={errorMessages} />
                    }
                </CardFooter>
            </div>
        </Card>
    );
});

export default memo(ProQuantitySelector);
