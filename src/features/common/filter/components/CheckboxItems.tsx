import React from "react";
import { Checkbox, Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFilter } from "../store/stateSlice";

interface CheckboxItemsProps {
    title: string;
    filterKey: string; // ✅ Key filter trong Redux (vd: "brand", "condition")
    options: { label: string; value: string }[];
    initialItemsToShow?: number;
}

const CheckboxItems: React.FC<CheckboxItemsProps> = ({
    title,
    filterKey,
    options,
    initialItemsToShow = 5,
}) => {
    const dispatch = useAppDispatch();

    // ✅ Lấy chính xác dữ liệu từ Redux theo key
    const selectedValues: string[] =
        useAppSelector((state) => state.filter.state[filterKey]) || [];

    const [showAll, setShowAll] = React.useState(false);

    const handleValueChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        dispatch(setFilter({ key: filterKey, value: newSelectedValues }));
    };

    const shouldShowMore = options.length > initialItemsToShow;
    const visibleOptions = showAll ? options : options.slice(0, initialItemsToShow);

    return (
        <div className="p-3 space-y-2">
            <h3 className="font-semibold text-md">{title}</h3>
            {visibleOptions.map(({ label, value }) => (
                <div key={value} className="flex items-center gap-x-3">
                    <Checkbox
                        id={`${title}-${value}`}
                        checked={selectedValues.includes(value)}
                        onCheckedChange={() => handleValueChange(value)}
                    />
                    <label htmlFor={`${title}-${value}`} className="text-md">
                        {label}
                    </label>
                </div>
            ))}
            {shouldShowMore && (
                <Button
                    variant="link"
                    className="p-0 text-sm text-primary"
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "Show less" : "Show more"}
                </Button>
            )}
        </div>
    );
};

export default CheckboxItems;
