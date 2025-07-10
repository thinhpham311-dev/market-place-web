// types.ts
export interface IFilter {
    categoryId?: string;
    brand?: string[];
    priceRange?: [number, number];
    rating?: number;
    color?: string[];
    sortBy?: 'popularity' | 'newest' | 'price-asc' | 'price-desc';
}
