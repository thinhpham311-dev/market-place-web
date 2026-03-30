import ApiService from "@/services/ApiService";

export async function apiPostBrandAllList() {
  return ApiService.fetchData({
    url: "/brand/all/list",
    method: "POST",
  });
}
