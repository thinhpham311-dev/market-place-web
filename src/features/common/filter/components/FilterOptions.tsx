'use client';

import React from 'react';
import FilterSection from './FilterSection';
import FilterCheckBox from './FilterCheckBox';
import type { Filter } from '../types';
import { useFilterContext } from '../hooks';


interface FilterRendererProps {
    filter: Filter;
}

const FilterRenderer: React.FC<FilterRendererProps> = ({ filter }) => {
    switch (filter.type) {
        case "checkbox":
            return (
                <FilterCheckBox
                    filterKey={filter.key}
                    options={filter.items}
                    initialItemsToShow={5}
                />
            );

        default:
            return (
                <p className="text-gray-500">
                    Not supported filter type: {filter.type ?? "unknown"}
                </p>
            );
    }
};

const FilterOptions = () => {
    const { data } = useFilterContext()
    return (
        <>
            {data?.map((filter: Filter) => (
                <FilterSection key={filter.key} title={filter.label} filterKey={filter.key}>
                    <FilterRenderer filter={filter} />
                </FilterSection>
            ))}
        </>
    );
};

export default React.memo(FilterOptions);
