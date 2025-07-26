'use client';

import React from 'react';
import SortByProvider from './providers';
import SortByWrapper from './components/SortByWrapper';
import SortOptionList from './components/SortByOptionsList';
import type { Sort } from './types';

interface ISortByProps {
    data: Sort[]
}

const SortBy = ({ data }: ISortByProps) => {
    return (
        <SortByProvider data={data} className='flex flex-row space-x-2'>
            <SortByWrapper>
                <SortOptionList />
            </SortByWrapper>
        </SortByProvider>
    );
};

export default SortBy;
