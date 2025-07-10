// components/SortBar.tsx
import React from 'react';
import { IFilter } from '@/interfaces/filter';
import { Card, CardContent } from '@/components/ui/molecules';
import { Button } from '@/components/ui/atoms';

interface SortBarProps {
    sortBy?: IFilter['sortBy'];
    onChange: (sort: IFilter['sortBy']) => void;
}

const sortOptions: { label: string; value: NonNullable<IFilter['sortBy']> }[] = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
];

const SortBar: React.FC<SortBarProps> = ({ sortBy, onChange }) => {
    return (
        <Card className="flex gap-4 mb-4" >
            <CardContent className='p-3'>
                {
                    sortOptions.map((option) => (
                        <Button
                            key={option.value}
                            className={`px-3 py-1 border rounded ${sortBy === option.value ? 'bg-black text-white' : ''
                                }`}
                            onClick={() => onChange(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))
                }
            </CardContent>
        </Card>
    );
};

export default SortBar;