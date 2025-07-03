import { IProduct } from "./product";

export interface IcartItem extends IProduct {
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