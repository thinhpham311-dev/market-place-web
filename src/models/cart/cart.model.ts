import { ICartItemModel } from './cart-item.model'

export interface ICartModel {
    cart_id: string
    cart_items: ICartItemModel[]
    cart_items_count: number
    cart_total_quantity: number
    cart_sub_total: number
    cart_total_price: number
    cart_total_discount: number
    cart_estimated_shipping: number
    cart_estimated_tax: number
    cart_selected_items: ICartItemModel[]
    cart_selected_items_count: number
    cart_selected_items_total: number
    cart_userId: string
}
