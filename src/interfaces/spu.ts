

export type VariantOption = {
    [key: string]: any;
};

export interface ISpuPro {
    product_id: string
    product_name: string,
    product_shop: string,
    product_category: string[],
    product_description: string,
    product_image: string,
    product_price: number,
    product_slug: string,
    product_brand: string,
    product_variations: VariantOption[]
    product_ratingsAverange: number,

}

export interface IFilter {
    ids?: Array<string> | string;
    limit?: number;
    sort?: string;
    page?: number;
    filter?: ISpuPro;
    search?: string;
}