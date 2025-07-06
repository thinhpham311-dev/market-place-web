import ApiService from "./ApiService"
import { IProductfilter } from "@/interfaces/product"

export async function apiPostProductsList(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/products/spu`,
        method: 'POST',
        data
    })
}

