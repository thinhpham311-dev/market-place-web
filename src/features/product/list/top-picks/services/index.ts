import ApiService from "@/services/ApiService";
import { IProductListRequest } from "@/features/product/list/top-picks/interfaces";

export async function apiPostProductsList(data: IProductListRequest) {
  return ApiService.fetchData({
    url: `/spu/all`,
    method: "POST",
    data,
  });
}
