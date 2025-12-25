"use client";

import React from "react";
import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers";
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks";
import { IPriceDisplay } from "@/features/common/price-display/store/initial";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IPriceDisplayProps {
    storeKey: string;
    initialValue: IPriceDisplay;
}

const PriceDisplay = React.forwardRef<
    HTMLDivElement,
    IPriceDisplayProps
>(({ storeKey, initialValue }, ref) => {

    const priceDisplay = useHandlePriceDisplay({
        reducerKey: PRICE_DISPLAY,
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
