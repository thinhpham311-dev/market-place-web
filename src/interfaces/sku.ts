import { VariantOption } from "./spu";

export interface ISkuPro {
    sku_id: string;
    sku_price: number;
    product_id: string;
    sku_stock: number;
    sku_tier_idx: VariantOption[];
    sku_sort: number;
    sku_default: boolean
}