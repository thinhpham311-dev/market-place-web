'use client';

import React from 'react';
import { Filter } from "@/features/common";
import { FILTER_OPTIONS } from '@/features/common/filter/constants';


const ProductFilter: React.FC = () => {

    return (
        <Filter data={FILTER_OPTIONS} />
    );
};

export default ProductFilter;
