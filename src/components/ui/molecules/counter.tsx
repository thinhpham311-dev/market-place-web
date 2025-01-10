'use client';
import React, { useState, useEffect, forwardRef, useImperativeHandle, memo } from "react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Plus, Minus } from "lucide-react";

interface ICounterProps {
    isButtonAdd?: boolean;
    value?: number;
    onQuantityChange?: (quantity: number) => void;
}

export interface CounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = memo(forwardRef<CounterRef, ICounterProps>(
    ({ isButtonAdd, value, onQuantityChange }, ref) => {
        const [count, setCount] = useState<number>(value || 1);

        // Trigger `onQuantityChange` only when `count` changes
        useEffect(() => {
            if (onQuantityChange) {
                onQuantityChange(count);
            }
        }, [count, onQuantityChange]);

        const increment = () => {
            setCount((prev) => prev + 1);
        };

        const decrement = () => {
            setCount((prev) => Math.max(0, prev - 1));
        };

        const reset = () => {
            setCount(1);
        };

        const getCount = () => count;

        useImperativeHandle(ref, () => ({
            reset,
            getCount
        }));

        const renderControls = () => (
            <div className="flex items-center space-x-1 flex-1">
                <Button
                    onClick={decrement}
                    size="icon"
                    variant="outline"
                    className="w-6 h-6 rounded-xl"
                    aria-label="Decrement"
                    disabled={count <= 1}
                >
                    <Minus />
                </Button>
                <Input
                    type="text"
                    value={count}
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
        );

        return (
            <>
                {isButtonAdd && count === 0 ? (
                    <Button
                        className="uppercase"
                        variant="outline"
                        size="sm"
                        onClick={increment}
                    >
                        Add to Cart
                    </Button>
                ) : (
                    renderControls()
                )}
            </>
        );
    }
));

Counter.displayName = "Counter";
