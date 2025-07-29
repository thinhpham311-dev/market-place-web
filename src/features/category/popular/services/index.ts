import ApiService from "@/services/ApiService"

export async function apiPostCategoriesList() {
    return ApiService.fetchData({
        url: `/categories/list`,
        method: 'POST',
    })
}

