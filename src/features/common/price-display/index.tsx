"use client";

import React from "react";
import PriceWithDiscount from "./components/PriceWithDiscount";
import PriceRange from "./components/PriceRange";
import PriceDisplayProvider from "@/features/common/price-display/providers";
import { useHandlePriceDisplay } from "@/features/common/price-display/hooks";
import { IPriceDisplayInitialValue } from "@/features/common/price-display/interfaces";
import { injectReducer } from "@/store";
import reducer from "@/features/common/price-display/store";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IPriceDisplayProps {
  storeKey: string;
  initialValue: IPriceDisplayInitialValue;
}
injectReducer(PRICE_DISPLAY, reducer);

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
