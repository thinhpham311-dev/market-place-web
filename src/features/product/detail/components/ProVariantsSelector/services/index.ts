import ApiService from "@/services/ApiService"
import { Product } from "@/features/product/types"

export async function apiPostSearchProductVariant(data: Product) {
    return ApiService.fetchData({
        url: `/spu/search-variation`,
        method: 'POST',
        data
    })
}
