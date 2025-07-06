"use client";

import * as React from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/molecules";
import { cn } from "@/lib/utils";
import { IOption } from "@/interfaces/product";

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<IOption>;
    className?: string;
    onChange?: (value: IOption | null) => void; // Callback to pass selected value
}

export const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<IOption | null>(null);

        const handleToggleItem = (item: IOption) => {
            const newValue = selectedValue?.value === item.value ? null : item;
            setSelectedValue(newValue);
            onChange?.(newValue);
        };

        return (
            <div
                ref={ref}
                className={cn("font-semibold leading-none tracking-tight", className)}
            >
                <p className="block font-bold mb-3" >
                    {label}:
                </p>
                <ToggleGroup type="single" className="justify-start flex-wrap">
                    {data.map((item, index) => {

                        return (
                            <ToggleGroupItem
                                variant="outline"
                                key={index}
                                value={item.value?.toString().split("").join("-")}
                                onClick={() => handleToggleItem(item)}
                                className={cn("capitalize", {
                                    "bg-blue-500 text-white": selectedValue?.value === item.value, // Example selected style
                                })}
                                size="sm"
                            >
                                {item.label}
                            </ToggleGroupItem>
                        )

                    })}
                </ToggleGroup>
            </div>
        );
    }
);

OptionsListOfTab.displayName = "OptionsListOfTab";
