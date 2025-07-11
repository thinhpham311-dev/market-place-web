// components/FilterSidebar.tsx
import React, { useState, useCallback } from 'react';
import { IFilter } from '@/interfaces/filter';
import { Card, CardHeader, CardTitle } from '@/components/ui/molecules';
import { Button } from '@/components/ui/atoms';
import { FaFilter } from "react-icons/fa";
import { CheckboxItems } from './Checkbox';
import { PriceRangeFilter } from './PriceRange';

import { FILTER_OPTIONS } from '@/constants/data/filter';

interface FilterSidebarProps {
    filters: IFilter;
    onChange: (filters: IFilter) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        brand: false,
        condition: false,
        promotion: false,
    });

    const toggleSection = useCallback((section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    }, []);

    const handleClearAll = () => {
        onChange({
            brand: [],
            priceRange: [0, 0],
            condition: [],
            promotion: [],
        });
    };

    return (
        <Card className="sticky top-4">
            <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold text-lg inline-flex items-center gap-2">
                        <FaFilter />
                        <span>Filters</span>
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearAll}
                        className="text-primary hover:text-primary"
                    >
                        Clear all
                    </Button>
                </div>
            </CardHeader>
            <hr />

            {/* Brand Filter */}
            <CheckboxItems
                title="Brand"
                options={FILTER_OPTIONS.brands}
                selectedValues={Array.isArray(filters.brand) ? filters.brand : []}
                onSelectionChange={(selected) => onChange({ ...filters, brand: selected })}
                showAll={expandedSections.brand}
                onToggleShowAll={() => toggleSection('brand')}
            />

            {/* Price Range */}
            <PriceRangeFilter
                priceRange={
                    Array.isArray(filters.priceRange)
                        ? (filters.priceRange as [number, number])
                        : [0, 0]
                }
                onChange={(range) => onChange({ ...filters, priceRange: range })}
            />

            {/* Condition Filter */}
            <CheckboxItems
                title="Condition"
                options={FILTER_OPTIONS.conditions}
                selectedValues={Array.isArray(filters.condition) ? filters.condition : []}
                onSelectionChange={(selected) => onChange({ ...filters, condition: selected })}
                showAll={expandedSections.condition}
                onToggleShowAll={() => toggleSection('condition')}
            />

            {/* Promotion Filter */}
            <CheckboxItems
                title="Promotion"
                options={FILTER_OPTIONS.promotions}
                selectedValues={Array.isArray(filters.promotion) ? filters.promotion : []}
                onSelectionChange={(selected) => onChange({ ...filters, promotion: selected })}
                showAll={expandedSections.promotion}
                onToggleShowAll={() => toggleSection('promotion')}
            />
        </Card>
    );
};

export default React.memo(FilterSidebar);