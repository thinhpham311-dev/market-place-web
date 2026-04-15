import ApiService from "@/services/ApiService";

export async function apiPostBrandAllList() {
  return ApiService.fetchData({
    url: "/brand/all",
    method: "POST",
  });
}
