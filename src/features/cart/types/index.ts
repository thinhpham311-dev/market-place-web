import { ISkuPro } from "@/interfaces/sku";

export type CartItem = ISkuPro & {
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
};
