import ApiService from "@/services/ApiService";
import { IRecentProductListRequest } from "@/features/product/list/recent/interfaces";

export async function apiGetRecentProducts({ limit, signal }: IRecentProductListRequest) {
  return ApiService.fetchData({
    url: "/search/recent",
    method: "GET",
    params: { limit },
    signal,
  });
}
