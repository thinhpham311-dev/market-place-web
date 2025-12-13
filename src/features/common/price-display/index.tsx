"use client";

import React from "react";
import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers";
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks";
import { IPriceDisplay } from "@/features/common/price-display/store/initial";

interface IPriceDisplayProps {
    reducerKey: string;
    storeKey: string;
    initialValue: IPriceDisplay;
}

const PriceDisplay = React.forwardRef<
    HTMLDivElement,
    IPriceDisplayProps
>(({ reducerKey, storeKey, initialValue }, ref) => {

    const priceDisplay = useHandlePriceDisplay({
        reducerKey,
        storeKey,
        initialValue
    });

    return (
        <PriceDisplayProvider contextValues={{ ...priceDisplay }}>
            <div ref={ref}>
                <PriceWithDiscount />
                <PriceRange />
            </div>
        </PriceDisplayProvider>
    );
});

PriceDisplay.displayName = "PriceDisplay";

export default PriceDisplay;
