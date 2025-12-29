"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { useFilterContext } from "@/features/common/filter/hooks";
import type { Filter } from "../../types";

interface ICheckboxItemProps {
  item: Filter;
  filterKey: string;
}

const CheckboxItem = React.memo(({ item, filterKey }: ICheckboxItemProps) => {
  const { filter, handleSetFilter } = useFilterContext();
  const { label, value } = item;

  const selectedValues: string[] = (filter?.[filterKey] as string[]) || [];
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
