import React from 'react';
import { IFilter } from '@/interfaces/filter';
import { Card, CardContent } from '@/components/ui/molecules';
import { Button, Input } from '@/components/ui/atoms';

interface FilterSidebarProps {
    filters: IFilter;
    onChange: (filters: IFilter) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange }) => {
    const handleCheckboxChange = (key: keyof IFilter, value: string) => {
        const prevValues = filters[key] as string[] | undefined;
        const nextValues = prevValues?.includes(value)
            ? prevValues.filter((v) => v !== value)
            : [...(prevValues || []), value];

        onChange({ ...filters, [key]: nextValues });
    };

    return (
        <Card>
            <CardContent className='p-3'>
                <h4 className="font-semibold text-lg ">Category</h4>
                <Button className='p-0 text-md' variant="link" onClick={() => onChange({ ...filters, categoryId: 'cat123' })}>
                    Men’s Clothing
                </Button>
            </CardContent>
            <CardContent className='p-3'>
                <h4 className="font-semibold text-lg">Brand</h4>
                {['Nike', 'Adidas', 'Puma'].map((brand) => (
                    <div key={brand} className="flex items-center gap-x-3">
                        <input
                            type="checkbox"
                            id="brand"
                            checked={filters.brand?.includes(brand) || false}
                            onChange={() => handleCheckboxChange('brand', brand)}
                        />
                        <label htmlFor='brand' className='text-md'>
                            {brand}
                        </label>
                    </div>
                ))}
            </CardContent>
            {/* Price Range */}
            <CardContent className='p-3 space-y-2'>
                <h4 className="font-semibold text-lg">Price</h4>
                <div className="grid grid-cols-3 gap-x-3 items-center">
                    <label htmlFor='min-price' className='text-md col-space-1'>
                        Min
                    </label>
                    <Input
                        id="min-price"
                        type="number"
                        placeholder="Min"
                        className='col-span-2'
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                priceRange: [+e.target.value, filters.priceRange?.[1] ?? 0],
                            })
                        }
                    />
                </div>

                <div className=" gap-x-3 grid grid-cols-3 items-center">
                    <label htmlFor='min-price' className='text-md col-span-1'>
                        Max
                    </label>
                    <Input
                        type="number"
                        placeholder="Max"
                        className='col-span-2'
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                priceRange: [filters.priceRange?.[0] ?? 0, +e.target.value],
                            })
                        }
                    />
                </div>

            </CardContent >
            <hr />
            <CardContent className='p-3'>
                <Button variant="outline" className='w-full'>Clear</Button>
            </CardContent>
        </Card >
    );
};

export default FilterSidebar;