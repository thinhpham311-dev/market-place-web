'use client';

import React from 'react';
import FilterOptions from './components/FilterOptions';
import FilterWarpper from './components/FilterWarpper';
import FilterProvider from './providers';
import { useHandleFilter } from '@/features/common/filter/hooks';
// import RangeFilter from './components/PriceRangeFilter';
import type { Filter } from './types';
import { FILTER } from "@/features/common/filter/constants";
import { IFilterState } from './store/initials';

interface IFilterProps {
    storeKey: string;
    initialValue: IFilterState
}

const Filter = ({ storeKey, ...rest }: IFilterProps) => {
    const filter = useHandleFilter({ reducerKey: FILTER, storeKey, ...rest });

    return (
        <FilterProvider contextValues={filter}>
            <FilterWarpper>
                <FilterOptions />
            </FilterWarpper>
        </FilterProvider>
    );
};

export default React.memo(Filter);
