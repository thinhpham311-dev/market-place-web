"use client";

import * as React from "react";

//ui
import {
    Label,
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui";

//libs
import { cn } from "@/lib/utils";

interface IOption {
    label?: string | React.ReactNode,
    value: string
}

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<IOption>;
    className?: HTMLDivElement | string;
    onChange?: (value: string | null) => void; // Callback to pass selected value
}

export const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

        const handleToggleItem = (item: IOption) => {
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

OptionsListOfTab.displayName = "OptionsListOfTab";
