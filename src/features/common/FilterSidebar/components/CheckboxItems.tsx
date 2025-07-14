// components/CheckboxItems.tsx
import React from 'react';
import { Checkbox, Button } from '@/components/ui';

interface CheckboxItemsProps {
    title: string;
    options: { label: string; value: string }[];
    selectedValues: string[];
    onSelectionChange: (selectedValues: string[]) => void;
    showAll: boolean;
    onToggleShowAll: () => void;
    initialItemsToShow?: number;
}

const CheckboxItems: React.FC<CheckboxItemsProps> = ({
    title,
    options,
    selectedValues,
    onSelectionChange,
    showAll,
    onToggleShowAll,
    initialItemsToShow = 5,
}) => {
    const handleValueChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        onSelectionChange(newSelectedValues);
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
                    onClick={onToggleShowAll}
                >
                    {showAll ? "Show less" : "Show more"}
                </Button>
            )}
        </div>
    );
};

export default CheckboxItems;