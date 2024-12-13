"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Plus, Minus } from "lucide-react";

interface ICounterProps {
    isButtonAdd?: boolean;
}

export interface CounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = forwardRef<CounterRef, ICounterProps>(
    ({ isButtonAdd }: ICounterProps, ref) => {
        const [count, setCount] = useState<number>(0);

        const increment = () => setCount((prev) => prev + 1);
        const decrement = () => setCount((prev) => Math.max(0, prev - 1));
        const reset = () => setCount(0);
        const getCount = () => count;

        // Expose methods to the parent component through the ref
        useImperativeHandle(ref, () => ({
            reset,
            getCount,
        }));

        const renderControls = () => (
            <div className="flex items-center space-x-1 flex-1">
                <Button
                    onClick={decrement}
                    size="icon"
                    variant="outline"
                    className="w-6 h-6 rounded-xl"
                    aria-label="Decrement"
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
);

Counter.displayName = "Counter";
