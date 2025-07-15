import React from "react";
import { Label, Checkbox, Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFilter, resetFilter } from "../store/stateSlice";
import { MdClear } from "react-icons/md";


interface CheckboxItemsProps {
    title: string;
    filterKey: string;
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

    const selectedValues: string[] =
        useAppSelector((state) => state.filter.state[filterKey]) || [];

    const [showAll, setShowAll] = React.useState(false);

    const handleValueChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        dispatch(setFilter({ key: filterKey, value: newSelectedValues }));
    };

    const handleReset = () => {
        dispatch(resetFilter(filterKey));
    };
    const shouldShowMore = options.length > initialItemsToShow;
    const visibleOptions = showAll ? options : options.slice(0, initialItemsToShow);

    return (
        <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-md py-2">{title}</h3>
                {selectedValues.length > 0 && (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={handleReset}
                    >
                        <MdClear size={15} />
                    </Button>
                )}
            </div>            {visibleOptions.map(({ label, value }) => (
                <div key={value} className="flex items-center gap-x-3">
                    <Checkbox
                        id={`${title}-${value}`}
                        checked={selectedValues.includes(value)}
                        onCheckedChange={() => handleValueChange(value)}
                    />
                    <Label htmlFor={`${title}-${value}`} className="text-md">
                        {label}
                    </Label>
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
