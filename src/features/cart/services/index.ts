import ApiService from "@/services/ApiService"
import { ISpuPro } from "@/interfaces/spu"


export async function apiPostCreateCart(data: ISpuPro) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}


