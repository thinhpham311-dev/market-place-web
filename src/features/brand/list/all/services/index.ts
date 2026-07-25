import ApiService from "@/services/ApiService";

export async function apiPostBrandAllList(data?: { search?: string; category_id?: string }) {
  return ApiService.fetchData({
    url: "/brand/all",
    method: "POST",
    data,
  });
}
