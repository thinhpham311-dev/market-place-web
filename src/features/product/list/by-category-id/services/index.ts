import ApiService from "@/services/ApiService"
import { Productfilter } from "@/features/product/types"


export async function apiPostProductsListByCategories(data: Productfilter) {
    return ApiService.fetchData({
        url: `/spu/list/categories`,
        method: 'POST',
        data
    })
}


