import ApiService from "@/services/ApiService";
import { IProductListRequest } from "@/features/product/list/by-brand-id/interfaces";

export async function apiPostProductsListByBrand(data: IProductListRequest) {
  const queryParams = new URLSearchParams();
  if (data?.ids) queryParams.set("brandId", String(data.ids));
  if (data?.limit) queryParams.set("limit", String(data.limit));
  const sortVal = (data as any)?.sort || (data as any)?.sortBy;
  if (sortVal) queryParams.set("sort", typeof sortVal === "object" ? sortVal.value : String(sortVal));
  if (data?.page) queryParams.set("page", String(data.page));

  const queryString = queryParams.toString();

  return ApiService.fetchData({
    url: `/spu/brand${queryString ? `?${queryString}` : ""}`,
    method: "POST",
    data,
  });
}
