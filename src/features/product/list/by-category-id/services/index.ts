import ApiService from "@/services/ApiService"
import { IProductListRequest } from "@/features/product/list/by-category-id/interfaces"


export async function apiPostProductsListByCategories(data: IProductListRequest) {
    return ApiService.fetchData({
        url: `/spu/categories`,
        method: 'POST',
        data
    })
}


