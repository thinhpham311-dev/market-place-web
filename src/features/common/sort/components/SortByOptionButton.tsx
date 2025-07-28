'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { FaRegCheckCircle } from "react-icons/fa";
import { useSortByContext } from '../hooks';
import type { Sort } from "../types"

interface SortOptionButtonProps {
    option: Sort
}

const SortByOptionButton: React.FC<SortOptionButtonProps> = ({ option }) => {
    const { setSortBy, sortBy } = useSortByContext();
    const { label, value } = option
    const isActive = sortBy.value === value;


    return (
        <Button
            size="sm"
            className={`px-3 py-1 border rounded-md`}
            onClick={() => setSortBy(option)}
        >
            {isActive && <FaRegCheckCircle className=" inline" />}
            <span>{label}</span>
        </Button>
    );
};

export default SortByOptionButton;
