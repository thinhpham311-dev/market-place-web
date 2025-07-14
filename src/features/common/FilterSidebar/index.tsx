'use client';

import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Card, CardHeader, CardTitle, Button } from '@/components/ui';
import { FaFilter } from "react-icons/fa";
import CheckboxItems from './components/CheckboxItems';
import PriceRangeFilter from './components/PriceRangeFilter';
import { FILTER_OPTIONS } from '@/constants/data/filter';

import {
    setBrand,
    setCondition,
    setPromotion,
    setPriceRange,
    resetFilters,
} from "./store/stateSlice";

const FilterSidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.productFilter);

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
        dispatch(resetFilters());
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

            <CheckboxItems
                title="Brand"
                options={FILTER_OPTIONS.brands}
                selectedValues={Array.isArray(filters.brand) ? filters.brand : []}
                onSelectionChange={(selected) => dispatch(setBrand(selected))}
                showAll={expandedSections.brand}
                onToggleShowAll={() => toggleSection('brand')}
            />

            <PriceRangeFilter
                priceRange={Array.isArray(filters.priceRange) ? filters.priceRange : [0, 0]}
                onChange={(range) => dispatch(setPriceRange(range))}
            />

            <CheckboxItems
                title="Condition"
                options={FILTER_OPTIONS.conditions}
                selectedValues={Array.isArray(filters.condition) ? filters.condition : []}
                onSelectionChange={(selected) => dispatch(setCondition(selected))}
                showAll={expandedSections.condition}
                onToggleShowAll={() => toggleSection('condition')}
            />

            <CheckboxItems
                title="Promotion"
                options={FILTER_OPTIONS.promotions}
                selectedValues={Array.isArray(filters.promotion) ? filters.promotion : []}
                onSelectionChange={(selected) => dispatch(setPromotion(selected))}
                showAll={expandedSections.promotion}
                onToggleShowAll={() => toggleSection('promotion')}
            />
        </Card>
    );
};

export default React.memo(FilterSidebar);
