
export interface IcartItem {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    quantity: number;
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