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
    data: Filter[];
}

const Filter = ({ storeKey, data }: IFilterProps) => {
    const filter = useHandleFilter({ storeKey, options: data });

    return (
        <FilterProvider contextValues={filter}>
            <FilterWarpper>
                <FilterOptions />
            </FilterWarpper>
        </FilterProvider>
    );
};

export default React.memo(Filter);
