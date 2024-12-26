"use client";

import * as React from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/molecules";
import { Label } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

interface IButtonOption {
    label?: string | React.ReactNode,
    value: string
}

interface IButtonOptionsListProps {
    label?: string;
    data: Array<IButtonOption>;
    className?: HTMLDivElement | string;
    onChange?: (value: string | null) => void; // Callback to pass selected value
}

export const ButtonTagsList = React.forwardRef<HTMLDivElement, IButtonOptionsListProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

        const handleToggleItem = (item: IButtonOption) => {
            const newValue = item.value === selectedValue ? null : item.value; // Allow deselection
            setSelectedValue(newValue);
            onChange?.(newValue); // Pass value back to parent
        };

        return (
            <div
                ref={ref}
                className={cn("font-semibold leading-none tracking-tight mb-5", className)}
            >
                <Label className="block font-bold mb-3" htmlFor="terms">
                    {label}:
                </Label>
                <ToggleGroup type="single" className="justify-start flex-wrap">
                    {data.map((item) => (
                        <ToggleGroupItem
                            variant="outline"
                            key={item.value?.split("").join("-")}
                            value={item.value?.split("").join("-")}
                            onClick={() => handleToggleItem(item)}
                            className={cn("capitalize", {
                                "bg-blue-500 text-white": selectedValue === item.value, // Example selected style
                            })}
                            size="sm"
                        >
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
        );
    }
);

ButtonTagsList.displayName = "ButtonTagsList";
