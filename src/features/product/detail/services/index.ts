import ApiService from "@/services/ApiService"
import { Product } from "@/features/product/types"


export async function apiPostProductDetail(data: Product) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}
