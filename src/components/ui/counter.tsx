'use client';
import React, { useState, useEffect, forwardRef, useImperativeHandle, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ICounterProps {
    initialValue?: number;
    onQuantityChange?: (quantity: number) => void;
    className?: string;
    isDisabled?: boolean; // ✅ thêm prop này
}

export interface ICounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = memo(
    forwardRef<ICounterRef, ICounterProps>(
        ({ onQuantityChange, initialValue = 1, className, isDisabled = false }, ref) => {
            const [localCount, setLocalCount] = useState<number>(initialValue);

            useEffect(() => {
                setLocalCount(initialValue);
            }, [initialValue]);

            const updateCount = (newCount: number) => {
                if (isDisabled) return; // ✅ ngăn thay đổi khi disabled
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
                        disabled={isDisabled || localCount <= 1} // ✅ disable khi có isDisabled
                    >
                        <Minus />
                    </Button>
                    <Input
                        type="text"
                        value={localCount}
                        readOnly
                        className="text-center text-sm w-12 h-8"
                        aria-label="Counter value"
                        disabled={isDisabled} // ✅ disable input
                    />
                    <Button
                        onClick={increment}
                        size="icon"
                        variant="outline"
                        className="w-6 h-6 rounded-xl"
                        aria-label="Increment"
                        disabled={isDisabled} // ✅ disable khi có isDisabled
                    >
                        <Plus />
                    </Button>
                </div>
            );
        }
    )
);

Counter.displayName = "Counter";
