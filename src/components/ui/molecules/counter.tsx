'use client';
import React, { useState, useEffect, forwardRef, useImperativeHandle, memo } from "react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ICounterProps {
    initialValue?: number; // Dùng initialValue thay vì value
    onQuantityChange?: (quantity: number) => void;
    className?: string
}

export interface ICounterRef {
    reset: () => void;
    getCount: () => number;
}

export const Counter = memo(
    forwardRef<ICounterRef, ICounterProps>(({ onQuantityChange, initialValue = 1, className }, ref) => {
        const [localCount, setLocalCount] = useState<number>(initialValue);
        // Đồng bộ giá trị từ props vào state mỗi khi initialValue thay đổi
        useEffect(() => {
            setLocalCount(initialValue);
        }, [initialValue]);

        const updateCount = (newCount: number) => {
            setLocalCount(newCount);
            onQuantityChange?.(newCount);
        };

        const increment = () => updateCount(localCount + 1);
        const decrement = () => updateCount(Math.max(0, localCount - 1));
        const reset = () => updateCount(initialValue); // Reset về giá trị ban đầu
        const getCount = () => localCount;

        useImperativeHandle(ref, () => ({
            reset,
            getCount,
        }));

        return (
            <div className={cn(className, "flex items-center space-x-1 ")}>
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
        );
    })
);

Counter.displayName = "Counter";
