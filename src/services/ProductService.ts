import ApiService from "./ApiService"

export async function apiGetProductsList() {
    return ApiService.fetchData({
        url: '/product/list',
        method: 'POST'
    })
}

