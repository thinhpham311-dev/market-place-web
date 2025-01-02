"use client";

import * as React from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/molecules";
import { Label } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";
import { IOption } from "@/types/product";

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<IOption>;
    className?: HTMLDivElement | string;
    onChange?: (value: string | null | Array<IOption> | undefined) => void; // Callback to pass selected value
}

export const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<string | null | Array<IOption> | undefined>(null);

        const handleToggleItem = (item: IOption) => {
            const newValue = item.value === selectedValue ? null : item.value; // Allow deselection
            setSelectedValue(newValue);
            onChange?.(newValue); // Pass value back to parent
        };

        return (
            <div
                ref={ref}
                className={cn("font-semibold leading-none tracking-tight ", className)}
            >
                <Label className="block font-bold mb-3" htmlFor="terms">
                    {label}:
                </Label>
                <ToggleGroup type="single" className="justify-start flex-wrap">
                    {data.map((item) => {
                        if (typeof item.value === "string" || item.value instanceof String) {
                            return (
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
                            )
                        }
                    })}
                </ToggleGroup>
            </div>
        );
    }
);

OptionsListOfTab.displayName = "OptionsListOfTab";
