"use client";

import React, { useState, useLayoutEffect, forwardRef, useImperativeHandle, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/utils/styles";

interface ICounterProps {
  initialValue: number;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
  maxValue?: number;
  minValue?: number; // ✅ thêm minValue để linh hoạt hơn
  isDisabled?: boolean;
}

export interface ICounterRef {
  reset: () => void;
  getCount: () => number;
  setCount: (value: number) => void; // ✅ thêm method setCount
}

export const Counter = memo(
  forwardRef<ICounterRef, ICounterProps>(
    (
      {
        onQuantityChange,
        initialValue,
        className,
        maxValue,
        minValue = 1, // ✅ giá trị mặc định là 1
        isDisabled = false,
      },
      ref,
    ) => {
      const [localCount, setLocalCount] = useState<number>(initialValue);

      useLayoutEffect(() => {
        setLocalCount(initialValue);
      }, [initialValue]);

      const updateCount = (newCount: number) => {
        if (isDisabled) return;

        // ✅ Validate giá trị
        let validatedCount = newCount;

        // Giới hạn dưới
        if (newCount < minValue) {
          validatedCount = minValue;
        }

        // Giới hạn trên (nếu có maxValue)
        if (maxValue !== undefined && newCount > maxValue) {
          validatedCount = maxValue;
        }

        // ✅ Chỉ cập nhật nếu giá trị thay đổi
        if (validatedCount !== localCount) {
          setLocalCount(validatedCount);
          onQuantityChange?.(validatedCount);
        }
      };

      const increment = () => updateCount(localCount + 1);
      const decrement = () => updateCount(localCount - 1);

      const reset = () => {
        setLocalCount(initialValue);
        onQuantityChange?.(initialValue);
      };

      const getCount = () => localCount;

      const setCount = (value: number) => updateCount(value);

      useImperativeHandle(ref, () => ({
        reset,
        getCount,
        setCount, // ✅ expose setCount method
      }));

      // ✅ Tính toán disabled state
      const isDecrementDisabled = isDisabled || localCount <= minValue;
      const isIncrementDisabled =
        isDisabled ||
        (maxValue !== undefined && Number.isInteger(maxValue) && localCount >= maxValue);

      return (
        <div className={cn(className, "flex items-center space-x-3")}>
          <Button
            onClick={decrement}
            size="icon"
            variant="outline"
            className="w-6 h-6 rounded-xl"
            aria-label="Decrement"
            disabled={isDecrementDisabled}
          >
            <Minus />
          </Button>
          <Input
            type="text"
            value={localCount}
            readOnly
            name="counter"
            className="text-center text-sm w-12 h-8"
            aria-label="Counter value"
            disabled={isDisabled}
          />
          <Button
            onClick={increment}
            size="icon"
            variant="outline"
            className="w-6 h-6 rounded-xl"
            aria-label="Increment"
            disabled={isIncrementDisabled}
          >
            <Plus />
          </Button>
        </div>
      );
    },
  ),
);

Counter.displayName = "Counter";
