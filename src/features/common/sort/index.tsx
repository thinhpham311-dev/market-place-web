'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSortBy } from './store/stateSlice';
import { Button } from '@/components/ui';

const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
] as const;

const SortBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector((state => state.sortBy));

    return (
        <div className='flex flex-row space-x-2'>
            {sortOptions.map((option) => (
                <Button
                    key={option.value}
                    className={`px-3 py-1 border rounded ${sortBy === option.value ? 'bg-black text-white' : ''
                        }`}
                    onClick={() => dispatch(setSortBy(option.value))}
                >
                    {option.label}
                </Button>
            ))}
        </div>

    );
};

export default SortBar;
