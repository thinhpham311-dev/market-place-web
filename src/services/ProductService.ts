import ApiService from "./ApiService"

export async function apiProductsList() {
    return ApiService.fetchData({
        url: '/product/list',
        method: 'POST'
    })
}

export async function apiProductDetail(data: { _id: string }) {
    return ApiService.fetchData({
        url: `/product/detail`,
        method: 'POST',
        data
    })
}