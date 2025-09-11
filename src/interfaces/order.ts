import { ISpuPro } from "@/interfaces/spu";

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

export interface IOrderItem extends ISpuPro {
    slug: string
    qty: number
    countInStock: number
}

export interface IShippingAddress {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}