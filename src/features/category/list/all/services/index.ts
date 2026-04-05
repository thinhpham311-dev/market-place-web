import ApiService from "@/services/ApiService";

export async function apiPostAllCategoriesList() {
  return ApiService.fetchData({
    url: "/categories/list",
    method: "POST",
  });
}
