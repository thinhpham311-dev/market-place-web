import ApiService from "./ApiService"
import { ICategory } from "@/interfaces/category"

export async function apiPostCategoriesList() {
    return ApiService.fetchData({
        url: `/categories/list`,
        method: 'POST',
    })
}

export async function apiPostCategoryDetail(data: ICategory) {
    return ApiService.fetchData({
        url: `/categories/detail`,
        method: 'POST',
        data
    })
}
