import { CartItemAction, CartGlobalAction } from '@/types/cart'

export type ActionState<T> = Record<CartGlobalAction, T>

export type ItemState<T> = Record<
    string,
    Partial<Record<CartItemAction, T>>
>

export interface LoadingState {
    global: boolean
    byItem: ItemState<boolean>
    actions: ActionState<boolean>
}
