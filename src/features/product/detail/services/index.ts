import ApiService from "@/services/ApiService"
import { IProduct } from "@/features/product/types"


export async function apiPostProductDetail(data: IProduct) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}
