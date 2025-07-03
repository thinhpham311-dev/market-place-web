import ApiService from "./ApiService"

export async function apiGetProductsList(data: any) {
    return ApiService.fetchData({
        url: '/product/spu/all/list',
        method: 'GET',
        data
    })
}

