
export interface IcartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Icart {
    items: IcartItem[];
    totalQuantity: number;
    totalAmount: number;
}