import ApiService from "@/services/ApiService";
import { IBrandListByCategoriesIdRequest } from "@/features/brand/list/by-category-id/interfaces";

export async function apiBrandsListByCategories(data: IBrandListByCategoriesIdRequest) {
  const queryParams = new URLSearchParams();
  if (data?.ids) {
    const idsVal = Array.isArray(data.ids) ? data.ids.join(",") : String(data.ids);
    queryParams.set("categoriesId", idsVal);
  }

  const queryString = queryParams.toString();

  return ApiService.fetchData({
    url: `/brand/categories${queryString ? `?${queryString}` : ""}`,
    method: "POST",
    data,
  });
}
