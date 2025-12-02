import { VariantOption } from "@/interfaces/spu"; // nếu có file này

export interface ICartItem {
    itemId?: string;
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
    itemTotalPrice?: number
}

export interface ICart {
    cart_id: string;
    cart_products: ICartItem[];
    cart_product_count: number;
    cart_total_quantity: number;
    cart_userId: string;
    cart_sub_total: number;
    cart_total_discount: number;
    cart_total_price: number;
    cart_estimated_shipping: number;
    cart_estimated_tax: number;
    cart_selected_items: ICartItem[];
    cart_selected_items_count: number;
    cart_selected_items_total: number;
}
