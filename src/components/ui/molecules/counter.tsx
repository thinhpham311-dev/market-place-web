"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Plus, Minus } from "lucide-react";

interface ICounterProps {
    isButtonAdd?: boolean;
}

export const Counter = ({ isButtonAdd }: ICounterProps) => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => Math.max(0, prev - 1));

    const renderControls = () => (
        <div className="flex items-center space-x-1">
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
        <div className=" border-none">
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
        </div>
    );
};
