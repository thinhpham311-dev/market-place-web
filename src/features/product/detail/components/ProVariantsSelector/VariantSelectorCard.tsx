"use client";

import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { cn } from "@/lib/utils";
import { VariantOption } from "./types";
import { useVariantsSelectorContext } from "./hooks";

interface VariantSelectorProps {
    label?: string;
    options: VariantOption[];
    className?: string;
    index: number;
}

export default function VariantSelectorCard({ label, options, className, index }: VariantSelectorProps) {
    const { selectedOptions, handleChooseOption } = useVariantsSelectorContext();
    const selected = selectedOptions[index] || null;

    const getItemKey = (value: string | VariantOption[]) =>
        typeof value === "string" ? value : JSON.stringify(value);

    const handleValueChange = (value: string) => {
        const selectedOption = options.find((item) => getItemKey(item.value) === value) || null;
        handleChooseOption(index, selectedOption);
    };

    return (
        <Card layout="horizontal" className={cn("font-semibold leading-none tracking-tight border-none shadow-none items-center space-x-3", className)}>
            <CardHeader className="p-0">
                {label && <CardTitle className="text-sm">{label}:</CardTitle>}
            </CardHeader>
            <CardContent className="p-0">
                <ToggleGroup
                    type="single"
                    value={selected ? getItemKey(selected.name) : ""}
                    onValueChange={handleValueChange}
                    className="justify-start flex-wrap"
                >
                    {options?.map((item, index) => {
                        const key = getItemKey(item.value);
                        const isSelected = selected?.value === item.value;
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
            </CardContent>
        </Card>
    );
}
