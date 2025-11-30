"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { useAppSelector } from "@/lib/hooks";
import PriceInput from "./PriceInput";
import PriceApplyButton from "./PriceApplyButton";
// import { useFilterContext } from "@/features/common/filter/hooks"

interface IFilterPriceRangeProps {
    options: string
}

const FilterPriceRange = ({
    //  options
}: IFilterPriceRangeProps) => {

    // const { handleSetFilter } = useFilterContext()

    const handleInputChange = (index: 0 | 1, value: string) => {
        console.log(index, value)
    };

    const handleApply = () => {
    };

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <div className="grid grid-cols-5 items-center gap-y-3">
                    <PriceInput
                        placeholder="Min"
                        value={0}
                        onChange={(v) => handleInputChange(0, v)}
                    />
                    <span className="text-center">-</span>
                    <PriceInput
                        placeholder="Max"
                        value={1000}
                        onChange={(v) => handleInputChange(1, v)}
                    />
                    <PriceApplyButton onClick={handleApply} />
                </div>
            </CardContent>
        </Card>
    );
};

export default FilterPriceRange;
