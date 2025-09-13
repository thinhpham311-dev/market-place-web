import ApiService from "@/services/ApiService"


export async function apiPostAddItem(data: { user_id: string }) {
    return ApiService.fetchData({
        url: `/cart/add`,
        method: 'POST',
        data
    })
}


export async function apiPostRemoveItem(data: { user_id: string }) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}


export async function apiPostShowItems(data: { user_id: string }) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}


export async function apiPostUpdateItem(data: { user_id: string }) {
    return ApiService.fetchData({
        url: `/spu/detail`,
        method: 'POST',
        data
    })
}


