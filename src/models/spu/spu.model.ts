import { IShopModel } from '@/models/shop'
import { IVariationModel } from '@/models/spu/variation.model'

export interface ISpuModel {
    product_id: string
    product_name: string
    product_shop: IShopModel
    product_category: string[]
    product_description?: string
    product_image: string
    product_price: number
    product_slug: string
    product_brand: string
    product_variations: IVariationModel[]
    product_ratingsAverange: number
}
