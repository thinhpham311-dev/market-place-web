import { IProduct } from "@/features/product/types";

export interface IOrder {
    _id: string
    user?: { name: string }
    items: Array<IOrderItem>
    shippingAddress: {
        fullName: string
        address: string
        city: string
        postalCode: string
        country: string
    }
    paymentMethod: string
    paymentResult?: { id: string; status: string; email_address: string }
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    isPaid: boolean
    isDelivered: boolean
    paidAt?: string
    deliveredAt?: string
    createdAt: string
    status: string
}

export interface IOrderItem extends IProduct {
    slug: string
    qty: number
    countInStock: number
}

export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}