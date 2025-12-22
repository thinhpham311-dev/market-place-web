import ApiService from "@/services/ApiService"
import { ICartItemModel } from "@/models/cart";


export async function apiPostShowItems(data: { userId: string }) {
    return ApiService.fetchData({
        url: `/cart/list`,
        method: 'POST',
        data
    })
}

export async function apiPostCreateItem(data: { userId: string, item: ICartItemModel }) {
    return ApiService.fetchData({
        url: `/cart/create`,
        method: 'POST',
        data
    })
}

export async function apiPostUpdateQtyItem(data: { userId: string, item: ICartItemModel }) {
    return ApiService.fetchData({
        url: `/cart/update-qty-item`,
        method: 'POST',
        data
    })
}

export async function apiPostUpdateVariantsItem(data: { userId: string, item: ICartItemModel }) {
    return ApiService.fetchData({
        url: `/cart/update-variants-item`,
        method: 'POST',
        data
    })
}

export async function apiPostDeleteItem(data: { userId: string, item: ICartItemModel }) {
    return ApiService.fetchData({
        url: `/cart/delete`,
        method: 'POST',
        data
    })
}

export async function apiPostDeleteItemsSelected(data: { userId: string, items: ICartItemModel[]; }) {
    return ApiService.fetchData({
        url: `/cart/delete-items`,
        method: 'POST',
        data
    })
}

export async function apiPostDeleteItemsAll(data: { userId: string }) {
    return ApiService.fetchData({
        url: `/cart/delete-all`,
        method: 'POST',
        data
    })
}


