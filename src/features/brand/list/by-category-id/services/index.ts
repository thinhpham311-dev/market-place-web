import ApiService from "@/services/ApiService";
import { IBrandListByCategoriesIdRequest } from "@/features/brand/list/by-category-id/interfaces";

export async function apiBrandsListByCategories(data: IBrandListByCategoriesIdRequest) {
  return ApiService.fetchData({
    url: `/brand/categories`,
    method: "POST",
    data,
  });
}
