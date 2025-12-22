import ApiService from "@/services/ApiService"
import { IShopModel } from "@/models/shop"

export async function apiPostShopDetail(data: IShopModel) {
    return ApiService.fetchData({
        url: `/shop/detail`,
        method: 'POST',
        data
    })
}
