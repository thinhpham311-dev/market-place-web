
export type Order = {
    _id: string
    user?: { name: string }
    items: [OrderItem]
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
}

export type OrderItem = {
    name: string
    slug: string
    qty: number
    image: string
    price: number
    color: string
    size: string
}

export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}