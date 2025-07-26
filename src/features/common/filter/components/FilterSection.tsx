"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import FilterClear from "./FilterClear";
import { useFilterContext } from "../hooks";

interface FilterSectionProps {
    title: string;
    filterKey: string;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, filterKey, children }) => {
    const { filters } = useFilterContext();
    const hasActiveFilters = Boolean(filters?.[filterKey]?.length);

    return (
        <Card>
            <CardHeader className="p-3 flex flex-row items-center justify-between">
                <CardTitle className="text-md font-semibold">{title}</CardTitle>
                {hasActiveFilters && <FilterClear filterKey={filterKey} />}
            </CardHeader>
            <hr />
            <CardContent className="p-3">
                <div className="space-y-3">{children}</div>
            </CardContent>
        </Card>
    );
};

export default React.memo(FilterSection);
