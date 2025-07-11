// components/PriceRangeFilter.tsx
import React from 'react';
import { CardContent, CardTitle, Input } from '@/components/ui';

interface PriceRangeFilterProps {
    priceRange: [number, number];
    onChange: (range: [number, number]) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
    priceRange,
    onChange,
}) => {
    const handleInputChange = (index: 0 | 1, value: string) => {
        const num = Number(value);
        if (isNaN(num)) return;

        const next = [...priceRange] as [number, number];
        next[index] = num;
        onChange(next);
    };

    return (
        <CardContent className="p-3 space-y-3">
            <CardTitle className="font-semibold text-md">Price Range ($)</CardTitle>
            <div className="grid grid-cols-5 gap-3 items-center">
                <Input
                    type="number"
                    placeholder="Min"
                    className="col-span-2"
                    value={priceRange?.[0] || ''}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    min={0}
                />
                <span className="text-center">-</span>
                <Input
                    type="number"
                    placeholder="Max"
                    className="col-span-2"
                    value={priceRange?.[1] || ''}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    min={0}
                />
            </div>
        </CardContent>
    );
};
