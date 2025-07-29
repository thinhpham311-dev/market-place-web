import ApiService from "@/services/ApiService"
import { IProductfilter } from "@/features/product/types"

export async function apiPostProductsList(data: IProductfilter) {
    return ApiService.fetchData({
        url: `/spu/list/all`,
        method: 'POST',
        data
    })
}
