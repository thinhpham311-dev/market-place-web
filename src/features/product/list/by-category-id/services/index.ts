import ApiService from "@/services/ApiService"
import { IFilter } from "@/interfaces/spu"


export async function apiPostProductsListByCategories(data: IFilter) {
    return ApiService.fetchData({
        url: `/spu/categories`,
        method: 'POST',
        data
    })
}


