'use client';

import React from 'react';
import FilterOptions from './components/FilterOptions';
import FilterWarpper from './components/FilterWarpper';
import FilterProvider from './providers';

// import RangeFilter from './components/PriceRangeFilter';
import type { Filter } from './types';

interface IFilterProps {
    data: Filter[];
}

const Filter = ({ data }: IFilterProps) => {
    return (
        <FilterProvider data={data}>
            <FilterWarpper>
                <FilterOptions />
            </FilterWarpper>
        </FilterProvider>
    );
};

export default React.memo(Filter);
