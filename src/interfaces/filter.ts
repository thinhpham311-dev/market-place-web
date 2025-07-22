// types.ts
export interface IFilter {
    categoryId?: string;
    brand?: string[];
    condition?: string[];
    promotion?: string[];
    priceRange?: [number, number];
    rating?: number;
    color?: string[];
    sortBy?: 'ctime' | 'pop' | 'sales' | 'asc' | 'desc';
}
