import { IOrderItemModel } from './order-item.model'
import { IShippingModel } from '@/models/shipping'
import { IPaymentModel } from '../payment/payment.model'
import { OrderStatus } from '@/types/order/order-status.type'

export interface IOrderModel {
    id: string

    user?: {
        name: string
    }

    items: IOrderItemModel[]

    shipping: IShippingModel
    payment: IPaymentModel
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number

    isPaid: boolean
    isDelivered: boolean

    paidAt?: string
    deliveredAt?: string
    createdAt: string

    status: OrderStatus
}
