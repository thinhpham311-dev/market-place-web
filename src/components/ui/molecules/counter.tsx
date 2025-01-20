'use client';
import React, { useState, forwardRef, useImperativeHandle, memo, useEffect } from "react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Plus, Minus } from "lucide-react";

interface ICounterProps {
    value: number;
    onQuantityChange?: (quantity: number) => void;
}

export interface CounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = memo(
    forwardRef<CounterRef, ICounterProps>(({ onQuantityChange, value }, ref) => {
        const [localCount, setLocalCount] = useState<number>(value);

        useEffect(() => {
            setLocalCount(value);
        }, [value]);

        const updateCount = (newCount: number) => {
            setLocalCount(newCount);
            onQuantityChange?.(newCount);
        };

        const increment = () => updateCount(localCount + 1);
        const decrement = () => updateCount(Math.max(0, localCount - 1));
        const reset = () => updateCount(value); // Reset to initial value
        const getCount = () => localCount;

        useImperativeHandle(ref, () => ({
            reset,
            getCount,
        }));

        return <div className="flex items-center space-x-1 flex-1">
            <Button
                onClick={decrement}
                size="icon"
                variant="outline"
                className="w-6 h-6 rounded-xl"
                aria-label="Decrement"
                disabled={localCount <= 1}
            >
                <Minus />
            </Button>
            <Input
                type="text"
                value={localCount}
                readOnly
                className="text-center text-sm w-12 h-8"
                aria-label="Counter value"
            />
            <Button
                onClick={increment}
                size="icon"
                variant="outline"
                className="w-6 h-6 rounded-xl"
                aria-label="Increment"
            >
                <Plus />
            </Button>
        </div>
    })
);

Counter.displayName = "Counter";
