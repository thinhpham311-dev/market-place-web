export type SkuPro = {
    sku_id: string;
    sku_price: string;
    sku: string;
    sku_stock: number;
    sku_tier_idx: { [key: string]: number };
    sku_sort: number;
    sku_default: boolean
}