"use client";

import React from "react";
import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers";
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks";
import { IPriceDisplayInitialValue } from "@/features/common/price-display/interfaces";

interface IPriceDisplayProps {
  storeKey: string;
  initialValue: IPriceDisplayInitialValue;
}

const PriceDisplay = React.forwardRef<HTMLDivElement, IPriceDisplayProps>(
  ({ storeKey, initialValue }, ref) => {
    const priceDisplay = useHandlePriceDisplay({
      storeKey,
      initialValue,
    });

    return (
      <PriceDisplayProvider contextValues={{ ...priceDisplay }}>
        <div ref={ref}>
          <PriceWithDiscount />
          <PriceRange />
        </div>
      </PriceDisplayProvider>
    );
  },
);

PriceDisplay.displayName = "PriceDisplay";

export default PriceDisplay;
