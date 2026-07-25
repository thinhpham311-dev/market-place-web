import ApiService from "@/services/ApiService";

export async function apiPostBrandPopularList() {
  return ApiService.fetchData({
    url: "/brand/popular",
    method: "POST",
  });
}
