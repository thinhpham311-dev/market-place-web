import ApiService from "./ApiService"

export async function apiGetProducts() {
    return ApiService.fetchData({
        url: '/films/list',
        method: 'post'
    })
}