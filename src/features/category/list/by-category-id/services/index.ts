import ApiService from "@/services/ApiService"
import { Category } from "@/features/category/types"


export async function apiPostCategoryDetail(data: Category) {
    return ApiService.fetchData({
        url: `/categories/detail`,
        method: 'POST',
        data
    })
}
