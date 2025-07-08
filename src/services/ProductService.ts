import ApiService from "./ApiService"
import { IProduct, IProductfilter } from "@/interfaces/product"

export async function apiPostProductsList(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/spu/list`,
        method: 'POST',
        data
    })
}

export async function apiPostProductDetail(data: IProduct) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}
