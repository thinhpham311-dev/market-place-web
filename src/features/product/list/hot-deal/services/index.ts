import ApiService from "@/services/ApiService"
import { Productfilter } from "@/features/product/types"

export async function apiPostProductsList(data: Productfilter) {
    return ApiService.fetchData({
        url: `/spu/list/all`,
        method: 'POST',
        data
    })
}
