// components/PriceRangeFilter.tsx (Redux version - không cần props)
import React from "react";
import { CardContent, CardTitle, Input, Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFilter } from "../store/stateSlice";

const PriceRangeFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const priceRange: [number, number] =
        useAppSelector((state) => state.filter.priceRange) || [0, 0];

    const handleInputChange = (index: 0 | 1, value: string) => {
        const num = Number(value);
        if (isNaN(num)) return;

        const next = [...priceRange] as [number, number];
        next[index] = num;
        dispatch(setFilter({ key: "priceRange", value: next }));
    };

    return (
        <CardContent className="p-3 space-y-3">
            <CardTitle className="font-semibold text-md">Price Range ($)</CardTitle>
            <div className="grid grid-cols-5 items-center">
                <Input
                    type="number"
                    placeholder="Min"
                    className="col-span-2"
                    value={priceRange[0] || ""}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    min={0}
                />
                <span className="text-center">-</span>
                <Input
                    type="number"
                    placeholder="Max"
                    className="col-span-2"
                    value={priceRange[1] || ""}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    min={0}
                />
            </div>
            <Button
                className="w-full"
                size="sm"
                onClick={() =>
                    dispatch(setFilter({ key: "priceRange", value: priceRange }))
                }
            >
                Apply
            </Button>
        </CardContent>
    );
};

export default PriceRangeFilter;
