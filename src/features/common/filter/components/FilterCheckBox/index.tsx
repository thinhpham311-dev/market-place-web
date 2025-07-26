"use client";

import React from "react";
import {
    Button,
    Card, CardContent
} from "@/components/ui";
import CheckboxItem from "./CheckboxItem";
// import { useFilterContext } from "../../hooks";
import { Filter } from "../../types";

interface IFilterCheckboxProps {
    options: Filter[];
    filterKey: string
    initialItemsToShow?: number;
}

const FilterCheckbox = ({
    options,
    filterKey,
    initialItemsToShow = 5,
}: IFilterCheckboxProps) => {
    const [showAll, setShowAll] = React.useState(false);

    const shouldShowMore = options?.length > initialItemsToShow;
    const visibleOptions = showAll
        ? options
        : options?.slice(0, initialItemsToShow);

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-2">
                {visibleOptions?.map((childItem: Filter) => {
                    const { key, value } = childItem
                    return (
                        <React.Fragment key={`${key}-${value}`} >
                            <CheckboxItem
                                filterKey={filterKey}
                                item={childItem}
                            />
                        </React.Fragment>
                    )
                }
                )}
                {shouldShowMore && (
                    <Button
                        variant="link"
                        className="p-0 text-sm text-primary"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? "Show less" : "Show more"}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default FilterCheckbox;
