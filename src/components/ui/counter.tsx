"use client";

import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
    memo,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ICounterProps {
    initialValue?: number;
    onQuantityChange?: (quantity: number) => void;
    className?: string;
    maxValue?: number;
    isDisabled?: boolean; // ✅ thêm prop này
}

export interface ICounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = memo(
    forwardRef<ICounterRef, ICounterProps>(
        (
            { onQuantityChange, initialValue = 1, className, maxValue = 0, isDisabled = false },
            ref
        ) => {
            const [localCount, setLocalCount] = useState<number>(initialValue);

            useEffect(() => {
                setLocalCount(initialValue);
            }, [initialValue]);

            const updateCount = (newCount: number) => {
                if (isDisabled) return;
                if (maxValue !== 0) {
                    newCount = Math.min(newCount, maxValue);
                }
                setLocalCount(newCount);
                onQuantityChange?.(newCount);
            };

            const increment = () => updateCount(localCount + 1);
            const decrement = () => updateCount(Math.max(0, localCount - 1));
            const reset = () => updateCount(initialValue);
            const getCount = () => localCount;

            useImperativeHandle(ref, () => ({
                reset,
                getCount,
            }));

            return (
                <div className={cn(className, "flex items-center space-x-3")}>
                    <Button
                        onClick={decrement}
                        size="icon"
                        variant="outline"
                        className="w-6 h-6 rounded-xl"
                        aria-label="Decrement"
                        disabled={isDisabled || localCount <= 1}
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
                        disabled={isDisabled || localCount >= maxValue}
                    >
                        <Plus />
                    </Button>
                </div>
            );
        }
    )
);

Counter.displayName = "Counter";
