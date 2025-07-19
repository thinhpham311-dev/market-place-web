"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { cn } from "@/lib/utils";
import { VariantOption } from "./types";
import { useVariantsSelector } from "./hooks";

interface VariantSelectorProps {
    label?: string;
    data: VariantOption[];
    className?: string;
    index: number;
}

export default function VariantSelector({ label, data, className, index }: VariantSelectorProps) {
    const { selectedOptions, handleChooseOption } = useVariantsSelector(data);
    const selected = selectedOptions[index] || null;

    const getItemKey = (value: string | VariantOption[]) =>
        typeof value === "string" ? value : JSON.stringify(value);

    const handleValueChange = (value: string) => {
        const selectedOption = data.find((item) => getItemKey(item.value) === value) || null;
        handleChooseOption(index, selectedOption);
    };

    return (
        <Card className={cn("font-semibold leading-none tracking-tight", className)}>
            <CardHeader>
                {label && <CardTitle className="text-sm">{label}:</CardTitle>}
            </CardHeader>
            <ToggleGroup
                type="single"
                value={selected ? getItemKey(selected.value) : ""}
                onValueChange={handleValueChange}
                className="justify-start flex-wrap"
            >
                {data.map((item, index) => {
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
        </Card>
    );
}
