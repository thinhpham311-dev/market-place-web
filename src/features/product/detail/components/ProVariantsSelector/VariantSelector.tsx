"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { cn } from "@/lib/utils";

// Types
export type VariantOption = {
    label: string;
    value: string | VariantOption[];
};

interface VariantSelectorProps {
    label?: string;
    data: VariantOption[];
    className?: string;
    onChange?: (value: VariantOption | null) => void;
}

const VariantSelector = React.forwardRef<HTMLDivElement, VariantSelectorProps>(
    ({ label, data, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<VariantOption | null>(null);

        const getItemKey = (value: string | VariantOption[]) =>
            typeof value === "string" ? value : JSON.stringify(value);

        const handleValueChange = (value: string) => {
            const selected = data.find((item) => getItemKey(item.value) === value) || null;
            setSelectedValue(selected);
            onChange?.(selected);
        };

        return (
            <div
                ref={ref}
                className={cn("font-semibold leading-none tracking-tight", className)}
            >
                {label && <p className="block font-bold mb-3">{label}:</p>}
                <ToggleGroup
                    type="single"
                    value={selectedValue ? getItemKey(selectedValue.value) : ""}
                    onValueChange={handleValueChange}
                    className="justify-start flex-wrap"
                >
                    {data.map((item, index) => {
                        const key = getItemKey(item.value);
                        const isSelected = selectedValue?.value === item.value;

                        return (
                            <ToggleGroupItem
                                key={index}
                                value={key}
                                variant="outline"
                                size="sm"
                                className={cn("capitalize", {
                                    "bg-blue-500 text-white": isSelected,
                                })}
                            >
                                {item.label}
                            </ToggleGroupItem>
                        );
                    })}
                </ToggleGroup>
            </div>
        );
    }
);

VariantSelector.displayName = "VariantSelector";
export default VariantSelector;
