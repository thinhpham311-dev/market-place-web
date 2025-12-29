"use client";
import React, { memo } from "react";

// components
import QuantitySelectorWrapper from "./components/QuantitySelectorWrapper";
import QuantitySelectorTitle from "./components/QuantitySelectorTitle";
import QuantitySelectorCounter from "./components/QuantitySelectorCounter";
import QuantitySelectorStock from "./components/QuantitySelectorStock";

// providers
import QuantitySelectorProvider from "./providers";

// hooks
import { useHandleQuantitySelector } from "./hooks";

import { IQuantityInitialValue } from "@/features/common/quantity-selector/interfaces";

interface IQuantitySelectorProps {
  storeKey: string;
  initialValue: IQuantityInitialValue;
  layout?: "vertical" | "horizontal";
  title?: string;
  onChangeQuantity?: (value: number) => void;
}

const QuantitySelector = React.forwardRef<HTMLDivElement, IQuantitySelectorProps>(
  ({ storeKey = "", initialValue, ...rest }, ref) => {
    const quantitySelector = useHandleQuantitySelector({
      storeKey,
      initialValue,
      ...rest,
    });

    return (
      <QuantitySelectorProvider contextValues={{ ...quantitySelector, ...rest }}>
        <div ref={ref}>
          <QuantitySelectorWrapper>
            <QuantitySelectorTitle />
            <QuantitySelectorCounter />
            <QuantitySelectorStock />
          </QuantitySelectorWrapper>
        </div>
      </QuantitySelectorProvider>
    );
  },
);

QuantitySelector.displayName = "QuantitySelector";

export default memo(QuantitySelector);
