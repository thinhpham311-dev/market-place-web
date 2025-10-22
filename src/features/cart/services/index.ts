import ApiService from "@/services/ApiService"
import { ICartItem } from "@/interfaces/cart"


export async function apiPostShowItems(data: ICartItem) {
    return ApiService.fetchData({
        url: `/cart/list`,
        method: 'POST',
        data
    })
}

export async function apiPostAddItem(data: ICartItem) {
    return ApiService.fetchData({
        url: `/cart/add`,
        method: 'POST',
        data
    })
}

export async function apiPostUpdateItem(data: ICartItem) {
    return ApiService.fetchData({
        url: `/cart/delete`,
        method: 'POST',
        data
    })
}

export async function apiPostDeleteItem(data: ICartItem) {
    return ApiService.fetchData({
        url: `/cart/delete`,
        method: 'POST',
        data
    })
}


