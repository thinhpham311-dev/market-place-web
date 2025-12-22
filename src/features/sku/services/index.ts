import ApiService from "@/services/ApiService"
import { ISkuModel } from "@/models/sku"


export async function apiPostSkuDetail(data: ISkuModel) {
    return ApiService.fetchData({
        url: `/sku/detail`,
        method: 'POST',
        data
    })
}


