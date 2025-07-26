"use client";

import React from "react";
import { Label, Checkbox, Card, CardContent } from "@/components/ui";
import { useFilterContext } from "@/features/common/filter/hooks";
import type { Filter } from "../../types";

interface ICheckboxItemProps {
    item: Filter;
    filterKey: string;
}

const CheckboxItem = React.memo(({ item, filterKey }: ICheckboxItemProps) => {
    const { filters, handleSetFilter } = useFilterContext();
    const { label, value } = item;

    const selectedValues: string[] = (filters?.[filterKey] as string[]) || [];
    const handleValueChange = (val: string) => {
        const newSelectedValues = selectedValues.includes(val)
            ? selectedValues.filter((v) => v !== val)
            : [...selectedValues, val];

        handleSetFilter(filterKey, newSelectedValues);
    };

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <div className="flex items-center gap-x-3">
                    <Checkbox
                        id={`${filterKey}-${value}`}
                        checked={selectedValues.includes(value)}
                        onCheckedChange={() => handleValueChange(value)}
                    />
                    <Label htmlFor={`${filterKey}-${value}`} className="text-md">
                        {label}
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
});

export default CheckboxItem;
