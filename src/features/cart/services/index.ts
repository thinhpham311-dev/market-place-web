import ApiService from "@/services/ApiService"
import { ICartItem, ICart } from "@/interfaces/cart"


export async function apiPostShowItems(data: ICart) {
    return ApiService.fetchData({
        url: `/cart/list`,
        method: 'POST',
        data
    })
}

export async function apiPostAddItem(data: { item: ICartItem }) {
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

export async function apiPostDeleteItems(data: { items: ICartItem[]; }) {
    return ApiService.fetchData({
        url: `/cart/delete-items`,
        method: 'POST',
        data
    })
}


