'use client';

import React from 'react';
import { useAppDispatch } from '@/lib/hooks';
import {
    Card,
    CardHeader,
    CardTitle,
    Button,
    CardFooter
} from '@/components/ui';
import { FaFilter } from 'react-icons/fa';
import CheckboxItems from './components/CheckboxItems';
import PriceRangeFilter from './components/PriceRangeFilter';
import { FILTER_OPTIONS } from '@/constants/data/filter';
import { resetAllFilters } from './store/stateSlice';
import { injectReducer } from '@/store';
import reducer from './store';

injectReducer('filter', reducer);

const FilterSidebar: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleClearAll = () => {
        dispatch(resetAllFilters());
    };

    return (
        <Card className="sticky top-[80px]">
            <CardHeader className="p-3">
                <CardTitle className="font-semibold text-lg inline-flex items-center gap-2">
                    <FaFilter />
                    <span>Filters</span>
                </CardTitle>
            </CardHeader>
            <hr />

            {/* ✅ Brand */}
            <CheckboxItems
                title="Brand"
                filterKey="brand"
                options={FILTER_OPTIONS.brands}
                initialItemsToShow={5}
            />

            {/* ✅ Price Range */}
            <PriceRangeFilter />

            {/* ✅ Condition */}
            <CheckboxItems
                title="Condition"
                filterKey="condition"
                options={FILTER_OPTIONS.conditions}
                initialItemsToShow={5}
            />

            {/* ✅ Promotion */}
            <CheckboxItems
                title="Promotion"
                filterKey="promotion"
                options={FILTER_OPTIONS.promotions}
                initialItemsToShow={5}
            />

            <hr />
            <CardFooter className="p-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-primary hover:text-primary w-full"
                >
                    Clear all
                </Button>
            </CardFooter>
        </Card>
    );
};

export default React.memo(FilterSidebar);
