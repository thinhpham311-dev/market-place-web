import ApiService from "@/services/ApiService";
import { IProductListRequest } from "@/features/product/list/suggestion/interfaces";

export async function apiPostProductsList(data: IProductListRequest) {
  return ApiService.fetchData({
    url: `/spu/all`,
    method: "POST",
    data,
  });
}
