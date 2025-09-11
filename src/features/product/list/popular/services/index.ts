import ApiService from "@/services/ApiService"
import { IFilter } from "@/interfaces/spu"

export async function apiPostProductsList(data: IFilter) {
    return ApiService.fetchData({
        url: `/spu/all`,
        method: 'POST',
        data
    })
}
