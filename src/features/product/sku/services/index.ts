import ApiService from "@/services/ApiService"
import { ISkuPro } from "@/interfaces/sku"


export async function apiPostSkuDetail(data: ISkuPro) {
    return ApiService.fetchData({
        url: `/sku/detail`,
        method: 'POST',
        data
    })
}


