import { Product } from "@/features/product/types";

export interface IcartItem extends Product {
    totalPrice?: number;
    discountedTotalPrice?: number;
    uniqueKey: string
}

export interface Icart {
    items: IcartItem[];
    totalQuantity: number;
    totalAmount: number;
    totalAmountDiscount: number;
    totalSelectItems: number
    total: number;
    estimatedShipping: number;
    estimatedTax: number;
    selectedItems: string[];
}