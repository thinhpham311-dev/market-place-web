import ApiService from "./ApiService"

export async function apiPostCategoriesList() {
    return ApiService.fetchData({
        url: `/categories/all`,
        method: 'POST',
    })
}

