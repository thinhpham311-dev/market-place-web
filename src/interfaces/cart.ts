import { ISkuPro } from "@/interfaces/sku";
import { ISpuPro } from "@/interfaces/spu"; // nếu có file này

export interface ICartItem extends ISkuPro, ISpuPro {
    quantity: number;
    totalPrice: number;
    discountedTotalPrice: number;
}

export interface ICart {
    items: ICartItem[];
    totalQuantity: number;
    totalAmount: number;
    totalAmountDiscount: number;
    totalSelectItems: number;
    total: number;
    estimatedShipping: number;
    estimatedTax: number;
    selectedItems: string[];
}
