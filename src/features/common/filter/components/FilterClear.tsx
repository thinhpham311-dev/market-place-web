'use client';

import React from 'react';
import { useFilterContext } from '@/features/common/filter/hooks';
import { MdClear } from "react-icons/md";


const FilterClear = ({ filterKey }: { filterKey: string }) => {
    const { handleResetFilter } = useFilterContext()
    return (
        <span
            onClick={() => handleResetFilter(filterKey)}
            className="text-primary hover:text-primary cursor-pointer"
        >
            <MdClear size={15} color='red' />
        </span>
    );
}

export default FilterClear
