import { ICartModel } from '@/models/cart/cart.model'
import { LoadingState } from './cart-loading.model'
import { ErrorState } from './cart-error.model'

export interface ICartResponse {
    loading: LoadingState
    data: ICartModel
    error: ErrorState
}
