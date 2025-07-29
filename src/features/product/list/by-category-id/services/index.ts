import ApiService from "@/services/ApiService"
import { IProductfilter } from "@/features/product/types"


export async function apiPostProductsListByCategories(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/spu/list/categories`,
        method: 'POST',
        data
    })
}


