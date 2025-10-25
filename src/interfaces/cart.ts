import { VariantOption } from "@/interfaces/spu"; // nếu có file này

export interface ICartItem {
    itemSkuId: string;
    itemSkuPrice: number;
    itemSkuStock: number;
    itemSkuTierIdx: number[];
    itemSpuName: string;
    itemSpuImage: string;
    itemSpuVariations: VariantOption[];
    itemSpuSlug: string;
    itemSpuId: string;
    itemShopId: string;
    itemShopName: string;
    itemShopSlug: string;
    itemUserId?: string;
    itemQuantity: number;
    itemSkuTotalPrice?: number
    storeKey: string
}

export interface ICart {
    cart_products: ICartItem[];
    cart_count_product: number;
    cart_total_quantity: number;
    cart_userId: string;
    cart_total_amount: number;
    cart_total_amount_discount: number;
    cart_total_select_items: number;
    cart_total: number;
    cart_estimated_shipping: number;
    cart_estimated_tax: number;
    cart_selected_items: string[];
}
