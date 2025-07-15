import ApiService from "./ApiService"
import { IProduct, IProductfilter } from "@/features/product/types"

export async function apiPostProductsList(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/spu/list/all`,
        method: 'POST',
        data
    })
}

export async function apiPostProductsListByCategories(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/spu/list/categories`,
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
