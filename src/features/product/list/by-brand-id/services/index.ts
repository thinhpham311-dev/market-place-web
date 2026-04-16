import ApiService from "@/services/ApiService";
import { IProductListRequest } from "@/features/product/list/by-brand-id/interfaces";

export async function apiPostProductsListByBrand(data: IProductListRequest) {
  return ApiService.fetchData({
    url: `/spu/brand`,
    method: "POST",
    data,
  });
}
