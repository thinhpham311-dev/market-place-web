import ApiService from "./ApiService"

export async function apiGetProducts() {
    return ApiService.fetchData({
        url: '/api/products',
        method: 'post'
    })
}