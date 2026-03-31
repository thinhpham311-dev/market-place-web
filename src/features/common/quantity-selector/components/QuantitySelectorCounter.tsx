"use client";
import * as React from "react";
import { useRef } from "react";

// ui
import { CardContent } from "@/components/ui/card";
import { Counter, ICounterRef } from "@/components/ui/counter";

// hooks
import { useQuantitySelectorContext } from "../hooks";
import { translateRuntime } from "@/lib/i18n/runtime-translation";

const QuantitySelectorCounter = () => {
  const counterRef = useRef<ICounterRef>(null);
  const {
    getValidate,
    updateQuantity,
    maxQuantity,
    currentQuantity,
    isDisabledQuantity,
    resetQuantity,
  } = useQuantitySelectorContext();

  React.useEffect(() => {
    if (!maxQuantity || maxQuantity === 0) {
      resetQuantity();
      counterRef.current?.reset?.();
    }
  }, [maxQuantity, resetQuantity]);

  const handleUpdateQuantity = (value: number) => {
    getValidate?.(value, [translateRuntime("quantity_limit_warning")]);
    updateQuantity(value);
  };

  return (
    <CardContent className="p-3 space-x-3 flex items-center">
      <Counter
        initialValue={currentQuantity}
        maxValue={maxQuantity}
        ref={counterRef}
        onQuantityChange={handleUpdateQuantity}
        isDisabled={isDisabledQuantity}
      />
    </CardContent>
  );
};

export default QuantitySelectorCounter;
