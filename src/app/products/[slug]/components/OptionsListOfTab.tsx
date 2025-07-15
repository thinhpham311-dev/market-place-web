"use client";

import * as React from "react";

//ui
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui";

//lib
import { cn } from "@/lib/utils";


type Option = {
    label: string;
    value: string | Array<Option>
}

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<Option>;
    className?: string;
    onChange?: (value: Option | null) => void; // Callback to pass selected value
}

export const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<Option | null>(null);

        const handleToggleItem = (item: Option) => {
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
