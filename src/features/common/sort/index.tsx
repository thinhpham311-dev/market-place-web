'use client';

import React from 'react';
import SortByProvider from './providers';
import SortByWrapper from './components/SortByWrapper';
import SortOptionList from './components/SortByOptionsList';
import { useSortBy } from '@/features/common/sort/hooks';
import type { Sort } from './types';

interface ISortByProps {
    data: Sort[]
    storeKey: string;
}

const SortBy = ({ storeKey, data }: ISortByProps) => {
    const sortBy = useSortBy({ storeKey, options: data })

    return (
        <SortByProvider
            contextValues={sortBy}
            className='flex flex-row space-x-2'
        >
            <SortByWrapper>
                <SortOptionList />
            </SortByWrapper>
        </SortByProvider>
    );
};

export default SortBy;
