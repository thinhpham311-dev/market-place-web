'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSortBy } from './store/stateSlice';
import { Button } from '@/components/ui';
import { injectReducer } from '@/store';
import reducer from './store';
import { FaRegCheckCircle } from "react-icons/fa";


const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
] as const;


injectReducer("sortBy", reducer)

const SortBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sortBy } = useAppSelector((state => state.sortBy.state));

    return (
        <div className='flex flex-row space-x-2'>
            {sortOptions.map((option) => (
                <Button
                    key={option.value}
                    size="sm"
                    className={`px-3 py-1 border rounded-md`}
                    onClick={() => dispatch(setSortBy(option.value))}
                >
                    {sortBy === option.value && <FaRegCheckCircle />}
                    <span> {option.label}</span>
                </Button>
            ))}
        </div>

    );
};

export default SortBar;
