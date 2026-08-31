import ApiService from "@/services/ApiService";
import { IProductListRequest } from "@/features/product/list/by-shop-id/interfaces";

export async function apiPostProductsListByShop(data: IProductListRequest) {
  return ApiService.fetchData({
    url: `/spu/shop`,
    method: "POST",
    data,
  });
}
