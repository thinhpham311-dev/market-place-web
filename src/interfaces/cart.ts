import { VariantOption } from "@/interfaces/spu"; // nếu có file này

export interface ICartItem {
    itemId: string;
    itemName: string;
    itemPrice: number;
    itemImage: string;
    itemVariations: VariantOption[];
    itemSlug: string;
    itemShopId: string;
    itemShopName: string;
    itemShopSlug: string;
    itemProductId: string;
    itemStock: number;
    itemTierIdx: number[];
    itemUserId?: string;
    quantity: number;
}

export interface ICart {
    items: ICartItem[];
    itemsCount?: number;
    totalQuantity: number;
    totalAmount: number;
    totalAmountDiscount: number;
    totalSelectItems: number;
    total: number;
    estimatedShipping: number;
    estimatedTax: number;
    selectedItems: string[];
}
