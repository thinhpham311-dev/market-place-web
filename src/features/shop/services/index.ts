import ApiService from "@/services/ApiService"
import { IShop } from "@/interfaces/shop"

export async function apiPostShopDetail(data: IShop) {
    return ApiService.fetchData({
        url: `/shop/detail`,
        method: 'POST',
        data
    })
}
