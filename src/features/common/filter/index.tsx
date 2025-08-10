'use client';

import React from 'react';
import FilterOptions from './components/FilterOptions';
import FilterWarpper from './components/FilterWarpper';
import FilterProvider from './providers';
import { useHandleFilter } from '@/features/common/filter/hooks';
// import RangeFilter from './components/PriceRangeFilter';
import type { Filter } from './types';

interface IFilterProps {
    storeKey: string;
    options: Filter[];
}

const Filter = ({ storeKey, options }: IFilterProps) => {
    const filter = useHandleFilter({ storeKey, options });

    return (
        <FilterProvider contextValues={filter}>
            <FilterWarpper>
                <FilterOptions />
            </FilterWarpper>
        </FilterProvider>
    );
};

export default React.memo(Filter);
